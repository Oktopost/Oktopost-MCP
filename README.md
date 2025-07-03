# Oktopost MCP Server

A Model Context Protocol (MCP) server that provides access to Oktopost API.

### Claude Desktop Example

Add the following to your Claude Desktop configuration file (`claude_desktop_config.json`):

```json
{
  "mcpServers": {
    "oktopost": {
      "command": "npx",
      "args": ["oktopost-mcp"],
      "env": {
        "REGION": "us",
        "OKTOPOST_ACCOUNT_ID": "your-oktopost-account-id",
        "OKTOPOST_API_KEY": "your-oktopost-api-key"
      }
    }
  }
}
```

### Configuration Options

| Environment Variable | Description | Default |
|---------------------|-------------|---------|
| `REGION` | Oktopost region ("us" or "eu") | `us` |
| `OKTOPOST_ACCOUNT_ID` | Your Oktopost account ID | Required |
| `OKTOPOST_API_KEY` | Your Oktopost API key | Required |


## License

MIT