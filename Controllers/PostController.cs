using BlogApp.Data;
using BlogApp.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace BloggingPlatform.Controllers
{
    [Route("api/posts")]
    [ApiController]
    public class PostController : ControllerBase
    {
        private readonly AppDbContext _context;

        public PostController(AppDbContext context)
        {
            _context = context;
        }

        // Create a new post
        [HttpPost]
        [Authorize]
        public async Task<ActionResult<Post>> CreatePost(Post post)
        {
            if (string.IsNullOrWhiteSpace(post.Title) || string.IsNullOrWhiteSpace(post.Content))
            {
                return BadRequest("Title and Content are required.");
            }

            var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value!);
            post.UserId = userId;

            _context.Posts.Add(post);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetPost), new { id = post.Id }, post);
        }

        // Get all posts
        [HttpGet]
        public async Task<ActionResult<IEnumerable<PostDto>>> GetPosts()
        {
            var posts = await _context.Posts.Include(p => p.User).ToListAsync();
            var postDtos = posts.Select(p => new PostDto
            {
                Id = p.Id,
                Title = p.Title,
                Content = p.Content,
                CreatedAt = p.CreatedAt,
                UserId = p.UserId,
                UserName = p.User.Name
            }).ToList();

            return Ok(postDtos);
        }

        // Get post by ID
        [HttpGet("{id}")]
        public async Task<ActionResult<PostDto>> GetPost(int id)
        {
            var post = await _context.Posts.Include(p => p.User).FirstOrDefaultAsync(p => p.Id == id);

            if (post == null)
            {
                return NotFound();
            }

            var postDto = new PostDto
            {
                Id = post.Id,
                Title = post.Title,
                Content = post.Content,
                CreatedAt = post.CreatedAt,
                UserId = post.UserId,
                UserName = post.User.Name
            };

            return Ok(postDto);
        }

        // Update post
        [HttpPut("{id}")]
        [Authorize]
        public async Task<IActionResult> UpdatePost(int id, Post post)
        {
            if (id != post.Id)
            {
                return BadRequest("Post ID mismatch.");
            }

            if (string.IsNullOrWhiteSpace(post.Title) || string.IsNullOrWhiteSpace(post.Content))
            {
                return BadRequest("Title and Content are required.");
            }

            var existingPost = await _context.Posts.FindAsync(id);

            if (existingPost == null)
            {
                return NotFound();
            }

            if (existingPost.UserId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value!))
            {
                return Unauthorized();
            }

            existingPost.Title = post.Title;
            existingPost.Content = post.Content;
            existingPost.CreatedAt = DateTime.UtcNow;

            await _context.SaveChangesAsync();
            return NoContent();
        }

        // Delete post
        [HttpDelete("{id}")]
        [Authorize]
        public async Task<IActionResult> DeletePost(int id)
        {
            var post = await _context.Posts.FindAsync(id);
            if (post == null)
            {
                return NotFound();
            }

            if (post.UserId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value!))
            {
                return Unauthorized();
            }

            _context.Posts.Remove(post);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}

