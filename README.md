# Background Processing with Node + RabbitMQ


**RabbitMQ**
* All messages are published on to an exchange
* A queue is connected to an exchange through a binding
* A binding defines the information how the queue is connected to the exchange (routing rules)
* A routing rule is used by the exchange to decide whether to forward the message to a queue or not
* A queue can be bound to many exchanges with different routing rules
* Exchange types
  * Direct: message forwarded to queue where binding key matches the routing key
  * Fanout: mindless broadcasting
  * Topic
  * Headers

```
[Publisher] -- publish --> [Exchange] -- routes --> [Queue] <-- consumes -- [Consumer]
```


## Quickstart

Start RabbitMQ and open `http://localhost:15672/` (guest / guest).

```bash
docker run -d -p 15672:15672 -p 5672:5672 --name rabbitmq rabbitmq:3-management
```
