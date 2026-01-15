Intro to Gateway API
2026-01-14T20:00:00.000-05:00

The [Gateway API](https://gateway-api.sigs.k8s.io/) allows you to make kubernetes services accessible to external clients.
Here’s a guide to setting one up and making your service available over the internet.

## Prerequisites:
1. Kubernetes cluster: configured to support external loadbalancers
1. Domain through dns: `yourdomain.com`

## Install Envoy Gateway
There are many different gateway implementations, this example will rely on [Envoy Gateway](https://gateway.envoyproxy.io/).

1. First, install [the envoy gateway chart](https://gateway.envoyproxy.io/docs/install/install-helm/) on the kubernetes cluster.  
    `helm install eg oci://docker.io/envoyproxy/gateway-helm --version v1.6.2 -n envoy-gateway-system --create-namespace`
1. Then create a [gatewayclass](https://gateway-api.sigs.k8s.io/api-types/gatewayclass/), a reusable configuration for gateways. In this case using the envoy gateway controller.
    ```yaml
    apiVersion: gateway.networking.k8s.io/v1
    kind: GatewayClass
    metadata:
    name: sample-class
    spec:
    controllerName: gateway.envoyproxy.io/gatewayclass-controller
    ```
1. A gateway can now be defined using your domain.  
    ```yaml
    apiVersion: gateway.networking.k8s.io/v1
    kind: Gateway
    metadata:
    name: sample-gateway
    spec:
    gatewayClassName: sample-class
    listeners:
    - name: http
        port: 80
        protocol: HTTP
        hostname: yourdomain.com
    ```
Now the gateway should be provisioned with its own corresponding pod and service.

## Deploy Web App
1. First, the web server needs to be running on the cluster. Here's a simple deployment for web server that just says hello-world
    ```yaml
    apiVersion: apps/v1
    kind: Deployment
    metadata:
    name: sample-server
    labels:
        app: sample-server
    spec:
    replicas: 1
    selector:
        matchLabels:
        app: sample-server
    template:
        metadata:
        labels:
            app: sample-server
        spec:
        containers:
        - name: server
            image: hashicorp/http-echo:1.0
            ports:
            - containerPort: 5678
            name: http-server
    ```
1. The deployment needs to be made reachable through a service. 
    ```yaml
    apiVersion: v1
    kind: Service
    metadata:
    name: sample-server
    spec:
    selector:
        app: sample-server
    ports:
        - protocol: TCP
        port: 5678
        targetPort: http-server
    ```
1. The service can be hooked up to the gateway with an HTTPRoute.
    ```yaml
    apiVersion: gateway.networking.k8s.io/v1
    kind: HTTPRoute
    metadata:
    name: hello-world
    spec:
    parentRefs:
    - name: sample-gateway
    rules:
    - matches:
        - path:
            type: PathPrefix
            value: /
        backendRefs:
        - name: sample-server
        port: 5678
    ```

## Configure DNS
1. Get the address for the gateway: `kubectl get gateway sample-gateway`
1. Create DNS record (A type??) with name: your url and content: gateway address

## Conclusion
Can now access website at `http://yourdomain.com`
This pattern can be reused for other webservices, gateway can handle lots of traffic.

### What's next?
- [External DNS](https://github.com/kubernetes-sigs/external-dns) can manage DNS records
- [Cert-manager](https://cert-manager.io/) Current configurations only work for http, which is not secure. Configuring certs will allow traffic over https

### References
All manifests from this post are made available [here](https://github.com/jaketerrito/gateway-api-service-example)
