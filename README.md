# Oktopost MCP Server

This MCP Server provides a full-featured integration layer on top of the Oktopost REST API, enabling secure, structured access to campaigns, messages, posts, media assets, uploads, social profiles, calendars, workflows, employee advocacy boards, and user data. It provides a comprehensive set of tools that enable MCP clients to create and manage content, schedule posts, handle approvals, interact with advocacy programs, and streamline day-to-day social operations directly in Oktopost.


## Available Tools

### Campaigns
- **create_campaign** — Create a new campaign with name, URL, and tags.  
- **get_campaign_by_id** — Retrieve a campaign by ID.  
- **list_campaigns** — List campaigns with optional filters.

### Messages (Content Assets)
- **create_message** — Create a new message with link or media attachments.  
- **get_message_by_id** — Get message data by ID.  
- **list_messages** — List messages by campaign or message IDs.

### Posts
- **create_post** — Create a social post, optionally sending it to workflow.  
- **update_post** — Update an unsent post.  
- **get_post** — Retrieve a post by ID, optionally with analytics.  
- **list_social_posts** — List social posts by post ID.  
- **get_social_post** — Get a single social post with optional stats.

### Media & Uploads
- **create_media** — Create a media asset from a public image URL.  
- **list_media** — List media assets with optional filters.  
- **get_media** — Get media by ID.  
- **create_upload** — Create a media upload request from a public URL.  
- **list_uploads** — List uploads with filters.  
- **get_upload** — Get an upload by ID.

### Calendar & Planning
- **get_calendar** — Retrieve calendar data with optional filters.

### Social Profiles
- **list_social_profiles** — List connected social profiles.  
- **get_social_profile** — Get a single social profile by ID.

### Approvals
- **list_workflows** — List all workflows and their steps.  
- **list_workflow_items** — List messages and posts pending approval.  
- **process_workflow_item** — Approve or reject an item (with optional note).  
- **list_workflow_item_notes** — List workflow notes for a post or message.  
- **add_workflow_item_note** — Add a workflow note for a post or message.

### Employee Advocacy
- **list_boards** — List all advocacy boards.  
- **list_board_topics** — List topics for advocacy boards.  
- **create_board_topic** — Create a new board topic.  
- **list_board_stories** — List stories in a board.  
- **create_board_story** — Create a new advocacy story.  
- **update_board_story** — Update an existing story.

### Users
- **list_users** — List users with basic info.  
- **get_user** — Get detailed information for a specific user.  


### Feedback
- **send_feedback** — Send bug reports or feature requests.


## Authorization

The Oktopost MCP Server supports multiple authentication flows depending on the client type. All methods authenticate against the Oktopost REST API and respect the user's roles, permissions, and asset-level access.

### Desktop Clients (Local Configuration)

Desktop MCP clients authenticate using environment variables defined in your local MCP configuration file. To run the MCP server locally, you must have **Node.js v20 or higher** installed and access to your Oktopost **Account ID**, **Region**, and **API Key**.


##### Example: How to Connect Claude Desktop

1. Add a local MCP server (using a command).
2. Open Claude Desktop's Settings and go to the Developer tab.
3. Click the Edit Config button to open the ```claude_desktop_config.json``` file.
4. Add a new entry to the mcpServers section with a name, command, and args that point to your server's executable and its arguments (for example, a Python script).
5. Save the file.
6. Close and restart Claude Desktop to reload the configuration and enable the server. 


```json
{
  "mcpServers": {
    "oktopost": {
      "command": "npx",
      "args": ["oktopost-mcp"],
      "env": {
        "OKTOPOST_ACCOUNT_REGION": "us",
        "OKTOPOST_ACCOUNT_ID": "your_oktopost_account_id",
        "OKTOPOST_API_KEY": "your_oktopost_api_key"
      }
    }
  }
}
````


### ChatGPT & Claude (OAuth)

ChatGPT and Claude (cloud versions) connect with Oktopost via **OAuth**. Users approve the requested scopes during the authorization flow, granting the MCP client secure, permission-aware access to your Oktopost workspace.

### Automation Tools (Basic Auth)

Automation platforms—such as **n8n** can connect to
**[https://mcp.oktopost.com](https://mcp.oktopost.com)** using **Basic HTTP Authentication**:

* **Username:** Your Oktopost **Account ID**
* **Password:** Your **API token** from Oktopost (generated in your account settings)

This enables automation systems to interact safely and programmatically with the full MCP toolset.

## Support

### Getting Help

If you encounter issues or have questions about the Oktopost MCP Server:

1. **Check the Documentation** - Review this README and configuration examples.
2. **Search Issues** - Check [GitHub Issues](https://github.com/Oktopost/oktopost-mcp/issues) for similar problems.
3. **Create an Issue** - If you find a bug or need a feature, [open a new issue](https://github.com/Oktopost/oktopost-mcp/issues/new).

### Contact Information

- **Email**: [help@oktopost.com](mailto:help@oktopost.com)
- **GitHub Issues**: [https://github.com/Oktopost/oktopost-mcp/issues](https://github.com/Oktopost/oktopost-mcp/issues)
- **Oktopost Support**: [https://help.oktopost.com](https://help.oktopost.com)

## License

This MCP Server is provided under the **Apache License 2.0**.

Oktopost customers may use this implementation in accordance with the Oktopost platform's Terms and Conditions.  

Developers are free to review the source code, modify it, and build their own MCP Server implementations for Oktopost, subject to the permissions and conditions defined in the Apache 2.0 license.
