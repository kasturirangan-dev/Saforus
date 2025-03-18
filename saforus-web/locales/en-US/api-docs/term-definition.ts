const termDefiniton = {
  title: 'Team Definition',
  description:
    'This page provides clear definitions of key terms used in our API integration guide. Understanding concepts like access tokens, API domains, idempotency, and webhooks will help you integrate our services smoothly and effectively.',
  application: {
    title: 'Application',
    'content-1':
      'The term "app" or "application" refers to your service application that intends to integrate our Digital Invisible  Watermarking and Piracy Detection services.',
  },
  'access-token': {
    title: 'Access Token',
    'content-1':
      'Once OAuth 2.0 authentication is successfully completed, an access token is issued. This token is essential when you make API calls. You must complete User Authentication first, and then include the access token in the request header for each API call.',
  },
  api: {
    title: 'API',
    'content-1':
      'An API (Application Programming Interface) is a set of protocols that facilitates communication and data exchange between your application and our web server.',
  },
  'api-domain': {
    title: 'API Domain',
    'content-1': `The 'API_DOMAIN' refers to the server URL used for testing or using our services in production. A staging environment is provided so that you can freely integrate and test API during development.`,
    'content-2':
      'After integrating and testing in Staging server, you should connect to Production server below to provide services to actual customers.',
  },
  webhook: {
    title: 'Webhooks',
    'content-1': `Webhooks allow your application to receive real-time notifications whenever there’s a change in data on the web server. They work as an HTTP-based callback function that sends event data directly from our web service to your application. Unlike API polling, where you repeatedly check the server for updates, webhooks deliver data immediately when an event occurs.

    To illustrate this with an analogy: polling is like constantly calling a friend to see if anything has happened, while webhooks are akin to asking your friend to call you when they have news. Polling usually involves making API calls every 60 to 120 seconds, which makes it hard to react in real-time. In contrast, webhooks send data instantly as soon as an event takes place.`,
  },
  idempotency: {
    title: 'Idempotency',
    'content-1': `Idempotency is the property of an operation that guarantees the same result, even if it is performed multiple times. An idempotent API ensures that if you make the  same request repeatedly, you will always get the same response.

      For instance, if an API call fails—perhaps due to a network issue—and you try the same call again, idempotency ensures that the outcome remains consistent. For example, if you make a watermarking request and it fails, retrying it with the same idempotency key will ensure that the watermark is only applied once. This feature allows for safe retries and helps prevent unintended problems in the system, making it essential for building reliable and secure APIs. 
      
      Some APIs in SaForus also support idempotency to enhance their reliability.`,
  },
};
export default termDefiniton;