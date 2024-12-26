import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

import { cn } from "@/lib/utils"

import { Badge } from "@/components/ui/badge"

const methodStyles = (method: string) => cn(
  method === 'POST' ? 'bg-green-700' : '',
)

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

interface APIResponse {
  name?: string;
  example: any;
  description?: string;
}

interface APIEndpoint {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  path: string;
  description: string;
  parameters?: {
    name: string;
    type: string;
    required: boolean;
    description: string;
  }[];
  requestBody?: {
    example: any;
    description?: string;
  };
  responses: APIResponse[];
}

const apiEndpoints: APIEndpoint[] = [
  {
    method: 'GET',
    path: '/api/customers',
    description: 'Retrieve a list of all customers',
    responses: [
      {
        name: 'Response',
        example: {
          customers: [
            {
              id: 1,
              name: 'John Doe',
              email: 'john@example.com'
            },
            {
              id: 2,
              name: 'Jane Smith',
              email: 'jane@example.com'
            }
          ]
        },
        description: 'Returns an array of customer objects'
      },
      {
        name: 'Response (with subscriptions)',
        example: {
          customers: [
            {
              id: 1,
              name: 'John Doe',
              email: 'john@example.com',
              subscription: {
                id: 1,
                status: 'active'
              },
            },
            {
              id: 2,
              name: 'Jane Smith',
              email: 'jane@example.com'
            }
          ]
        },
        description: 'If subscriptions are active for a customer, some information about the subscription will be included in the response.',
      }
    ]
  },
  {
    method: 'POST',
    path: '/api/customers',
    description: 'Create a new customer',
    parameters: [
      {
        name: "name",
        type: 'string',
        required: true,
        description: "Name of the customer"
      },
      {
        name: "email",
        type: 'string',
        required: true,
        description: "Email address of the customer"
      },
      {
        name: "notes",
        type: 'string',
        required: false,
        description: "Notes about the customer"
      }
    ],
    requestBody: {
      example: {
        name: 'John Doe',
        email: 'john@example.com',
        notes: 'This is a note'
      }
    },
    responses: [
      {
        name: 'Response',
        example: {
          message: 'Customer created successfully',
          success: true
        }
      },
    ]
  },
  {
    method: 'GET',
    path: '/api/subscriptions',
    description: 'Retrieve a list of all subscriptions',
    responses: [
      {
        example: {
          subscriptions: [
            {
              id: 1,
              name: 'Basic',
              description: '$9.99 per month',
              price: 9.99,
              created_at: '2023-01-01T00:00:00.000Z',
              updated_at: '2023-01-01T00:00:00.000Z'
            },
            {
              id: 2,
              name: 'Pro',
              description: '$19.99 per month',
              price: 19.99,
              created_at: '2023-01-01T00:00:00.000Z',
              updated_at: '2023-01-01T00:00:00.000Z'
            }
          ],
        },
        description: 'Returns an array of subscription objects'
      }
    ]
  },
  {
    method: 'POST',
    path: '/api/subscriptions',
    description: 'Create a new subscription',
    parameters: [
      {
        name: "name",
        type: 'string',
        required: true,
        description: "Name of the subscription"
      },
      {
        name: "description",
        type: 'string',
        required: false,
        description: "Description of the subscription"
      },
      {
        name: "price",
        type: 'number',
        required: true,
        description: "Price of the subscription"
      },
      {
        name: "features",
        type: 'array',
        required: false,
        description: "Array of feature objects"
      }
    ],

    requestBody: {
      example: {
        name: 'Basic',
        description: '$9.99 per month',
        price: 9.99,
        features: [
          {
            name: 'Feature 1',
            description: 'This is a feature description'
          },
          {
            name: 'Feature 2',
            description: 'This is another feature description'
          }
        ]
      }
    },
    responses: [
      {
        name: 'Response',
        example: {
          message: 'Customer created successfully',
          success: true
        }
      },
    ]
  },
  {
    method: 'GET',
    path: '/api/customer_subscriptions',
    description: 'Retrieve a list of all customer subscriptions',
    responses: [
      {
        example: {
          customer_subscriptions: [
            {
              id: 1,
              customer_id: 1,
              subscription_id: 1,
              status: "active",
              subscription_starts_at: "2024-12-23 21:57:21",
              subscription_ends_at: 1734993633434,
              created_at: "2024-12-23 21:57:21",
              updated_at: "2024-12-23 21:57:21"
            },
          ],
        },
        description: 'Returns an array of customer subscription objects'
      }
    ]
  },
  {
    method: 'POST',
    path: '/api/subscriptions',
    description: 'Create a new subscription',
    parameters: [
      {
        name: "name",
        type: 'string',
        required: true,
        description: "Name of the subscription"
      },
      {
        name: "description",
        type: 'string',
        required: false,
        description: "Description of the subscription"
      },
      {
        name: "price",
        type: 'number',
        required: true,
        description: "Price of the subscription"
      },
      {
        name: "features",
        type: 'array',
        required: false,
        description: "Array of feature objects"
      }
    ],

    requestBody: {
      example: {
        name: 'Basic',
        description: '$9.99 per month',
        price: 9.99,
        features: [
          {
            name: 'Feature 1',
            description: 'This is a feature description'
          },
          {
            name: 'Feature 2',
            description: 'This is another feature description'
          }
        ]
      }
    },
    responses: [
      {
        name: 'Response',
        example: {
          message: 'Customer created successfully',
          success: true
        }
      },
    ]
  },
];

export const APIDocumentation = ({ apiToken }: { apiToken?: string }) => {
  return (
    <div className="space-y-4">
      <Card className={cn("space-y-4", apiToken ? "" : "border-red-500")}>
        <CardHeader>
          <CardTitle>Authentication</CardTitle>
          <CardDescription>
            All requests must be authenticated by passing the API token as a request header. The API token is configured using <a className="text-primary underline" href="https://developers.cloudflare.com/workers/configuration/secrets/">secrets</a>.
          </CardDescription>
        </CardHeader>

        {apiToken ? (
          <CardContent className="space-y-4">
            <div>
              <Label className="space-y-2">
                <span>API Token</span>
                <div className="flex items-center space-x-2">
                  <Input placeholder="API token" readOnly value={apiToken} />
                </div>
              </Label>
            </div>

            <div className="space-y-2">
              <Label>Supported header styles</Label>

              <div className="space-y-4">
                <Input value={`Authorization: Bearer ${apiToken}`} readOnly />
                <Input value={`Authorization: Token ${apiToken}`} readOnly />
                <Input value={`x-api-token: ${apiToken}`} readOnly />
              </div>
            </div>
          </CardContent>
        ) : (
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              API token not configured. Please configure an API token by setting a <a className="text-primary underline" href="https://developers.cloudflare.com/workers/configuration/secrets/">secret</a> named <code>API_TOKEN</code>.
            </p>
          </CardContent>
        )}
      </Card>

      <div>
        {apiEndpoints.map((endpoint, index) => (
          <Card key={index} className="mb-4">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Badge
                  className={methodStyles(endpoint.method)}
                  variant={
                    endpoint.method === 'GET' ? 'default' :
                      endpoint.method === 'POST' ? 'destructive' :
                        endpoint.method === 'PUT' ? 'warning' :
                          'secondary'
                  }
                >
                  {endpoint.method}
                </Badge>
                <code className="text-sm font-mono">{endpoint.path}</code>
              </div>
              <CardDescription>
                {endpoint.description}
              </CardDescription>
            </CardHeader>

            <CardContent>
              <Accordion type="single" collapsible>
                {endpoint.parameters && endpoint.parameters.length > 0 && (
                  <AccordionItem value="parameters">
                    <AccordionTrigger>Parameters</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-2">
                        {endpoint.parameters.map((param, paramIndex) => (
                          <div key={paramIndex} className="border-b pb-2">
                            <div className="flex items-center gap-2">
                              <code className="text-sm font-mono">{param.name}</code>
                              <Badge variant="outline">{param.type}</Badge>
                              {param.required && (
                                <Badge variant="destructive">Required</Badge>
                              )}
                            </div>
                            <p className="text-sm text-muted-foreground mt-1">
                              {param.description}
                            </p>
                          </div>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                )}

                {endpoint.requestBody && (
                  <AccordionItem value="request">
                    <AccordionTrigger>Request Body</AccordionTrigger>
                    <AccordionContent>
                      <pre className="bg-muted p-4 rounded-lg overflow-auto">
                        {JSON.stringify(endpoint.requestBody.example, null, 2)}
                      </pre>
                      {endpoint.requestBody.description && (
                        <p className="text-sm text-muted-foreground mt-2">
                          {endpoint.requestBody.description}
                        </p>
                      )}
                    </AccordionContent>
                  </AccordionItem>
                )}

                {endpoint.responses.map((response, responseIndex) => (
                  <AccordionItem
                    key={responseIndex}
                    value={`response-${responseIndex}`}
                  >
                    <AccordionTrigger>
                      {endpoint.responses.length === 1 ? "Response" : response.name}
                    </AccordionTrigger>
                    <AccordionContent>
                      <pre className="bg-muted p-4 rounded-lg overflow-auto">
                        {JSON.stringify(response.example, null, 2)}
                      </pre>
                      {response.description && (
                        <p className="text-sm text-muted-foreground mt-2">
                          {response.description}
                        </p>
                      )}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
