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
