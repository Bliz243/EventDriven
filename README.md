# EventDriven

This project is made to illustrate how to setup rabbitmq and 2 microservices in Kubernetes, to illustrate how to setup Kubernetes and reason for the infastructure setup a report has been made.

The report will first describe the monolith architecture and how to convert this infastructure into microservices and finally add Event-driven on top of this.

---

Has to be applied after the 4 rabbit pods are set up

Setup clustering for the 4 nodes

rabbitmqctl set_policy ha-four ".\*" '{"federation-upstream-set":"all", "ha-sync-mode":"automatic", "ha-mode":"nodes", "ha-params":["rabbit@rabbitmq-0.rabbitmq.rabbits.svc.cluster.local","rabbit@rabbitmq-1.rabbitmq.rabbits.svc.cluster.local","rabbit@rabbitmq-2.rabbitmq.rabbits.svc.cluster.local", "rabbit@rabbitmq-3.rabbitmq.rabbits.svc.cluster.local"]}' --priority 1 --apply-to queues
