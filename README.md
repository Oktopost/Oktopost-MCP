# Oktopost MCP Client

A Model Context Protocol (MCP) client that connects Claude Desktop to the Oktopost API via a cloud-hosted MCP server.

## Installation

```bash
npm install -g oktopost-mcp-client
```

## Configuration

Add the following to your Claude Desktop configuration file (`claude_desktop_config.json`):

```json
{
  "mcpServers": {
    "oktopost": {
      "command": "oktopost-mcp-client",
      "env": {
        "MCP_SERVER_URL": "https://qdtv850np7.execute-api.us-east-1.amazonaws.com/",
        "REGION": "us",
        "OKTOPOST_ACCOUNT_ID": "your-oktopost-username",
        "OKTOPOST_API_KEY": "your-oktopost-password"
      }
    }
  }
}
```

### Configuration Options

| Environment Variable | Description | Default |
|---------------------|-------------|---------|
| `MCP_SERVER_URL` | URL of the Oktopost MCP server | `https://mcp.oktopost.com` |
| `REGION` | Oktopost region ("us" or "eu") | `us` |
| `OKTOPOST_ACCOUNT_ID` | Your Oktopost account username | Required |
| `OKTOPOST_API_KEY` | Your Oktopost account password | Required |

## What This Does

This client acts as a bridge between:
- **Claude Desktop** ↔ **oktopost-mcp-client** (stdio/local)
- **oktopost-mcp-client** ↔ **Oktopost MCP Server** (HTTP/cloud)

The client:
1. Connects to Claude Desktop via the MCP stdio protocol
2. Forwards all tool and resource requests to the cloud-hosted Oktopost MCP server
3. Passes your credentials securely via HTTP headers
4. Returns responses back to Claude


## License

MIT