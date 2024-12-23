import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { Badge } from "@/components/ui/badge"

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
        example: [
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
        ],
        description: 'Returns an array of customer objects'
      },
      {
        name: 'Response (with subscriptions)',
        example: [
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
        ],
        description: 'If subscriptions are active for a customer, some information about the subscription will be included in the response.',
      }
    ]
  },
  {
    method: 'GET',
    path: '/api/subscriptions',
    description: 'Retrieve a list of all subscriptions',
    responses: [
      {
        example: [
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
        description: 'Returns an array of subscription objects'
      }
    ]
  },
  // Add more endpoints here
];

export const APIDocumentation = () => {
  return (
    <div>
      {apiEndpoints.map((endpoint, index) => (
        <Card key={index} className="mb-4">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Badge variant={
                endpoint.method === 'GET' ? 'default' :
                endpoint.method === 'POST' ? 'destructive' :
                endpoint.method === 'PUT' ? 'warning' :
                'secondary'
              }>
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
  )
}
