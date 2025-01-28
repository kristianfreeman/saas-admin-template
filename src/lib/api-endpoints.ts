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

export { apiEndpoints };
