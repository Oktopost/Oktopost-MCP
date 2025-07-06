# Oktopost MCP Server

A Model Context Protocol (MCP) server that enables AI assistants to generate and publish content with Oktopost. This server bridges AI models with Oktopost's social publishing platform, supporting content creation, scheduling, and publishing for corporate channels, as well as content generation and placement in the Employee Advocacy Board for employee sharing.

Our implementation focuses on high-impact workflows, ensuring brand-compliant content is created efficiently and distributed appropriately. Optimized for AI-driven interactions, it enables scalable, reliable content operations across both corporate and advocacy use cases.

## Prerequisites

This MCP server requires Node.js (version 20 or higher) to be installed on your system.

### Installing Node.js

**macOS:**
1. Visit [nodejs.org](https://nodejs.org)
2. Download the LTS installer (.pkg file)
3. Double-click and follow the installation wizard

**Alternative (if you have Homebrew):**
```bash
brew install node
```

**Windows:**
1. Visit [nodejs.org](https://nodejs.org)
2. Download the LTS installer (.msi file)
3. Run the installer and follow the wizard

**Linux (Ubuntu/Debian):**
```bash
curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
sudo apt-get install -y nodejs
```

**Verify Installation:**
```bash
node --version
npm --version
```

## Usage

### Claude Desktop

**Step 1: Find your configuration file**

The Claude Desktop configuration file is located at:
- **macOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`
- **Windows**: `%APPDATA%/Claude/claude_desktop_config.json`

**Step 2: Add the MCP server configuration**

Add the following to your `claude_desktop_config.json` file:

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
```

**Step 3: Restart Claude Desktop**

After saving the configuration file, restart Claude Desktop for the changes to take effect.

### Other MCP Clients

Besides Claude Desktop, this MCP server works with many other MCP clients:

#### Desktop Applications
- **5ire** - Cross-platform AI assistant
- **Cherry Studio** - Multi-LLM desktop client
- **HyperChat** - Open source chat client

#### Command Line Tools
- **mcptools** - Go-based CLI: `brew install f/mcptools/mcp`
- **mcp-client-cli** - Simple CLI for MCP servers
- **mcp-cli** - Advanced chat mode with streaming

#### IDE Integrations
- **Visual Studio Code** - Official MCP support (preview)
- **Sourcegraph Cody** - VSCode and JetBrains extensions
- **Zed Editor** - High-performance editor with MCP support

#### Programming Libraries
- **mcp-use** - Python library for LLM-MCP integration
- **open-mcp-client** - Open source MCP client library

For a complete list of MCP clients, visit the [awesome-mcp-clients](https://github.com/punkpeye/awesome-mcp-clients) repository.

### Configuration Options

| Environment Variable | Description | Default |
|---------------------|-------------|---------|
| `OKTOPOST_ACCOUNT_REGION` | Oktopost region ("us" or "eu") | `us` |
| `OKTOPOST_ACCOUNT_ID` | Your Oktopost account ID | Required |
| `OKTOPOST_API_KEY` | Your Oktopost API key | Required |

## Support

### Getting Help

If you encounter issues or have questions about the Oktopost MCP Server:

1. **Check the Documentation** - Review this README and configuration examples
2. **Search Issues** - Check [GitHub Issues](https://github.com/Oktopost/oktopost-mcp/issues) for similar problems
3. **Create an Issue** - If you find a bug or need a feature, [open a new issue](https://github.com/Oktopost/oktopost-mcp/issues/new)

### Contact Information

- **Email**: [help@oktopost.com](mailto:help@oktopost.com)
- **GitHub Issues**: [https://github.com/Oktopost/oktopost-mcp/issues](https://github.com/Oktopost/oktopost-mcp/issues)
- **Oktopost Support**: [https://help.oktopost.com](https://help.oktopost.com)

## License

MIT
