export const getCustomers = async (baseUrl) => {
  const response = await fetch(baseUrl + '/api/customers');
  if (response.ok) {
    const data = await response.json();
    return {
      customers: data.customers,
      success: true
    }
  } else {
    console.error("Failed to fetch customers");
    return {
      customers: [],
      success: false
    }
  }
};

export const createCustomer = async (baseUrl, customer) => {
  const response = await fetch(baseUrl + '/api/customers', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(customer)
  });
  if (response.ok) {
    const data = await response.json();
    return {
      customer: data.customer,
      success: true
    }
  } else {
    console.error("Failed to create customer");
    return {
      customer: null,
      success: false
    }
  }
};

export const createSubscription = async (baseUrl, subscription) => {
  const response = await fetch(baseUrl + '/api/subscriptions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(subscription)
  });
  if (response.ok) {
    const data = await response.json();
    return {
      subscription: data.subscription,
      success: true
    }
  } else {
    console.error("Failed to create subscription");
    return {
      subscription: null,
      success: false
    }
  }
};

export const getSubscriptions = async (baseUrl) => {
  const response = await fetch(baseUrl + '/api/subscriptions');
  if (response.ok) {
    const data = await response.json();
    return {
      subscriptions: data.subscriptions,
      success: true
    }
  } else {
    console.error("Failed to fetch subscriptions");
    return {
      subscriptions: [],
      success: false
    }
  }
};

export const getUserSubscriptions = async (baseUrl) => {
  const response = await fetch(baseUrl + '/api/user_subscriptions');
  if (response.ok) {
    const data = await response.json();
    return {
      subscriptions: data.subscriptions,
      success: true
    }
  } else {
    console.error("Failed to fetch user subscriptions");
    return {
      subscriptions: [],
      success: false
    }
  }
};
