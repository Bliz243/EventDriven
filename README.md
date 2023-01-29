# EventDriven

This project is made to illustrate how to setup rabbitmq and 2 microservices, in conjuncture with the report related to the project.

---

Has to be applied after the 4 rabbit pods are set up

Setup clustering for the 4 nodes

rabbitmqctl set_policy ha-four ".\*" '{"federation-upstream-set":"all", "ha-sync-mode":"automatic", "ha-mode":"nodes", "ha-params":["rabbit@rabbitmq-0.rabbitmq.rabbits.svc.cluster.local","rabbit@rabbitmq-1.rabbitmq.rabbits.svc.cluster.local","rabbit@rabbitmq-2.rabbitmq.rabbits.svc.cluster.local", "rabbit@rabbitmq-3.rabbitmq.rabbits.svc.cluster.local"]}' --priority 1 --apply-to queues
