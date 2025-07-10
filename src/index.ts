import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';

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
} from '@modelcontextprotocol/sdk/types.js';
import axios from 'axios';
import { readFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const MCP_SERVER_URL = process.env.MCP_HOST || 'https://mcp.oktopost.com';
const OKTOPOST_REGION = process.env.OKTOPOST_ACCOUNT_REGION || 'us';
const OKTOPOST_ACCOUNT_ID = process.env.OKTOPOST_ACCOUNT_ID || '-';
const OKTOPOST_API_KEY = process.env.OKTOPOST_API_KEY || '-';

const getVersion = () => {
	try {
		const __filename = fileURLToPath(import.meta.url);
		const __dirname = dirname(__filename);

		const packagePath = join(__dirname, '..', 'package.json');
		const pkg = JSON.parse(readFileSync(packagePath, 'utf8'));
		return pkg.version;
	} catch {
		return '1.0-dev';
	}
};

class OktopostMCP {
	private server: Server;

	constructor() {
		this.server = new Server(
			{
				name: 'oktopost-mcp',
				version: getVersion(),
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

	private async makeRequest(endpoint: string, data: Record<string, unknown>) {
		const headers: Record<string, string> = {
			'Content-Type': 'application/json',
		};

		headers['X-Oktopost-Account-ID'] = OKTOPOST_ACCOUNT_ID;
		headers['X-Oktopost-API-Key'] = OKTOPOST_API_KEY;
		headers['X-Oktopost-Region'] = OKTOPOST_REGION;

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

	private setupHandlers() {
		this.server.setRequestHandler(ListToolsRequestSchema, async () => {
			const response = await this.makeRequest('/mcp/tools/list', {
				method: 'tools/list',
			});

			if (response.error) {
				throw new Error(response.error.message);
			}

			return {
				...response.result,
				_meta: {},
			};
		});

		this.server.setRequestHandler(
			CallToolRequestSchema,
			async (request: CallToolRequest) => {
				const response = await this.makeRequest('/mcp/tools/call', {
					method: 'tools/call',
					params: {
						name: request.params.name,
						arguments: request.params.arguments || {},
					},
				});

				if (response.error) {
					throw new Error(response.error.message);
				}

				if (response.result && response.result.content) {
					const processedContent = response.result.content.map(
						(item: Record<string, unknown>) => {
							if (item.type === 'text' && typeof item.text === 'object') {
								return { ...item, text: JSON.stringify(item.text, null, 2) };
							}

							return item;
						}
					);

					return {
						content: processedContent,
						_meta: {},
					};
				}

				return {
					...response.result,
					_meta: {},
				};
			}
		);

		// Handle resource listing
		this.server.setRequestHandler(ListResourcesRequestSchema, async () => {
			const response = await this.makeRequest('/mcp/resources/list', {
				method: 'resources/list',
			});

			if (response.error) {
				throw new Error(response.error.message);
			}

			return {
				...response.result,
				_meta: {},
			};
		});

		// Handle resource reading
		this.server.setRequestHandler(
			ReadResourceRequestSchema,
			async (request: ReadResourceRequest) => {
				const response = await this.makeRequest('/mcp/resources/read', {
					method: 'resources/read',
					params: {
						uri: request.params.uri,
					},
				});

				if (response.error) {
					throw new Error(response.error.message);
				}

				return {
					...response.result,
					_meta: {},
				};
			}
		);

		// Handle prompt listing
		this.server.setRequestHandler(ListPromptsRequestSchema, async () => {
			const response = await this.makeRequest('/mcp/prompts/list', {
				method: 'prompts/list',
			});

			if (response.error) {
				throw new Error(response.error.message);
			}

			return {
				...response.result,
				_meta: {},
			};
		});

		// Handle prompt getting
		this.server.setRequestHandler(
			GetPromptRequestSchema,
			async (request: GetPromptRequest) => {
				const response = await this.makeRequest('/mcp/prompts/get', {
					method: 'prompts/get',
					params: {
						name: request.params.name,
						arguments: request.params.arguments || {},
					},
				});

				if (response.error) {
					throw new Error(response.error.message);
				}

				return {
					...response.result,
					_meta: {},
				};
			}
		);
	}

	async run() {
		const transport = new StdioServerTransport();
		await this.server.connect(transport);

		console.error(`Oktopost-MCP server v${getVersion()} is ready`);
	}
}

const client = new OktopostMCP();

client.run().catch(error => {
	console.error('Failed to start Oktopost-MCP: ', error);
	process.exit(1);
});
