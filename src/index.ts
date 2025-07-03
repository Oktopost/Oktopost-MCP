import {Server} from "@modelcontextprotocol/sdk/server/index.js";
import {StdioServerTransport} from "@modelcontextprotocol/sdk/server/stdio.js";
import {
    ListToolsRequestSchema,
    CallToolRequestSchema,
    ListResourcesRequestSchema,
    ReadResourceRequestSchema,
    ListPromptsRequestSchema,
    GetPromptRequestSchema,
    CallToolRequest,
    ReadResourceRequest,
    GetPromptRequest,
} from "@modelcontextprotocol/sdk/types.js";
import axios from "axios";


const MCP_SERVER_URL = process.env.MCP_SERVER_URL || "https://mcp.oktopost.com";
const OKTOPOST_REGION = process.env.REGION || "us";
const OKTOPOST_ACCOUNT_ID = process.env.OKTOPOST_ACCOUNT_ID || '-';
const OKTOPOST_API_KEY = process.env.OKTOPOST_API_KEY || '-';

class OktopostMCPClient 
{
    private server: Server;

    
    constructor() {
        this.server = new Server(
            {
                name: "oktopost-mcp-client",
                version: "1.0.0",
            },
            {
                capabilities: {
                    tools: {},
                    resources: {},
                    prompts: {},
                },
            }
        );

        this.setupHandlers();
    }

    
    private async makeRequest(endpoint: string, data: any) {
        const headers: Record<string, string> = {
            "Content-Type": "application/json",
        };

        headers["X-Oktopost-Account-ID"] = OKTOPOST_ACCOUNT_ID;
        headers["X-Oktopost-API-Key"] = OKTOPOST_API_KEY;
        headers["X-Oktopost-Region"] = OKTOPOST_REGION;

        try {
            const response = await axios.post(`${MCP_SERVER_URL}${endpoint}`, data, {
                headers,
                timeout: 30000,
            });

            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const message = error.response?.data?.error?.message || error.message;
                throw new Error(`API Error: ${message}`);
            }
            throw error;
        }
    }

    private setupHandlers() 
    {
        this.server.setRequestHandler(ListToolsRequestSchema, async () => 
        {
            const response = await this.makeRequest("/mcp/tools/list", {
                method: "tools/list",
            });

            if (response.error) 
            {
                throw new Error(response.error.message);
            }

            return {
                ...response.result,
                _meta: {}
            };
        });

        this.server.setRequestHandler(CallToolRequestSchema, async (request: CallToolRequest) => 
        {
            const response = await this.makeRequest("/mcp/tools/call", {
                method: "tools/call",
                params: {
                    name: request.params.name,
                    arguments: request.params.arguments || {},
                },
            });

            if (response.error) 
            {
                throw new Error(response.error.message);
            }

            if (response.result && response.result.content) {
                const processedContent = response.result.content.map((item: any) => 
                {
                    if (item.type === "text" && typeof item.text === "object") 
                    {
                        return {...item, text: JSON.stringify(item.text, null, 2)};
                    }
                    
                    return item;
                });

                return {
                    content: processedContent,
                    _meta: {}
                };
            }

            return {
                ...response.result,
                _meta: {}
            };
        });


        // Handle resource listing
        this.server.setRequestHandler(ListResourcesRequestSchema, async () => 
        {
            const response = await this.makeRequest("/mcp/resources/list", 
            {
                method: "resources/list",
            });

            if (response.error) 
            {
                throw new Error(response.error.message);
            }

            return {
                ...response.result,
                _meta: {}
            };
        });

        // Handle resource reading
        this.server.setRequestHandler(ReadResourceRequestSchema, async (request: ReadResourceRequest) => 
        {
            const response = await this.makeRequest("/mcp/resources/read", {
                method: "resources/read",
                params: 
                {
                    uri: request.params.uri,
                },
            });

            if (response.error) 
            {
                throw new Error(response.error.message);
            }

            return {
                ...response.result,
                _meta: {}
            };
        });

        // Handle prompt listing
        this.server.setRequestHandler(ListPromptsRequestSchema, async () => 
        {
            const response = await this.makeRequest("/mcp/prompts/list", {
                method: "prompts/list",
            });

            if (response.error) 
            {
                throw new Error(response.error.message);
            }

            return {
                ...response.result,
                _meta: {}
            };
        });

        // Handle prompt getting
        this.server.setRequestHandler(GetPromptRequestSchema, async (request: GetPromptRequest) => 
        {
            const response = await this.makeRequest("/mcp/prompts/get", {
                method: "prompts/get",
                params: {
                    name: request.params.name,
                    arguments: request.params.arguments || {},
                },
            });

            if (response.error) 
            {
                throw new Error(response.error.message);
            }

            return {
                ...response.result,
                _meta: {}
            };
        });
    }

    async run() 
    {
        const transport = new StdioServerTransport();
        await this.server.connect(transport);

        console.error("Oktopost MCP Client ready");
        console.error(`Server URL: ${MCP_SERVER_URL}`);
        console.error(`AccountID: ${OKTOPOST_ACCOUNT_ID ? "***" + OKTOPOST_ACCOUNT_ID.slice(-4) : "NOT SET"}`);
    }
}

const client = new OktopostMCPClient();

client.run().catch((error) => 
{
    console.error("Failed to start client:", error);
    process.exit(1);
});