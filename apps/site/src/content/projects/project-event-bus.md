---
title: "Event Bus"
description: "A Distributed Request Dispatch System where work is broadcast to multiple workers. Ownership is determined through first-claim mechanism. Workers stream real-time updates back to clients until completed."
thumbnail: "/assets/project-cards/event-bus.png"
techStack: ["Redis Pubsub", "Multiprocessing", "Python", "Distributed Systems"]
github: "https://github.com/suu-b/event-bus"
---

Once, I was discussing Gig businesses like Zomato, Swiggy, and Rapido with my friend on a call. Though the discussion primarily concerned the business side of these companies, there were brief moments when we kinda touched their technical side. Being an engineering student, I felt fascinated by it. After our call was over, I began wondering how their infra works: serving requests of hundreds of clients and distributing them to the on-field employees. At the same time, mitigating the non-determinism involved, it is upon the on-field person's will to accept or deny pending requests.

I thought -- how can I simulate this whole system right in my PC?

I began with Python because I had no intent to deal with language intricacies. I wanted a language where I can focus primarily on design (Vibe coding is another option as well, though I did not want to get things done, but rather learn at each point of the process).

I planned that I would require a few components:

- Clients: Clients would create requests.
- Workers: These workers (called Servers in my repo) would be responsible for fulfilling the client's requests. They would be independent entities lurking in the system, looking for jobs.
- The System: Responsible for spinning up the workers.
- And a publishing mechanism -- whenever a client creates a request, all available workers must be notified. They may pick it up or just ignore.

A quick LLM interaction pointed me towards Redis pubsub for the publishing mechanism. I was tempted to leverage it; however, I decided to refrain and first try to simulate the system using native Python as much as I can.

This resulted in the first checkpoint:
A Single Request-Slot Universe
Article content
Single Request Slot Universe

I leveraged the multiprocessing library of Python to spin up a distributed system in the project. Servers (Workers) and Clients were all different Python processes. A Client could put their request in a single global slot; once filled, every server will be notified. Some of them would ignore the request, others would show interest. Only one will be able to claim it and proceed further.

This was a first step and actually a naive approach. Consequently, there were many issues. The major issue was that no other client could put their request until the slot was empty. In other words, No Multi-user support.

The easiest way to achieve this would be to add an illusion to end clients that they are actually making requests simultaneously.
Illusion: Users can make multiple requests now!
Article content
I introduced a buffer gateway

To allow multiple users to make requests simultaneously (or at least without waiting for one to finish), I introduced a gateway queue that would act like a buffer. It would collect clients' requests, but the single-request slot universe is still intact. Until the slot is empty, the queue cannot put a request in it. Client would not be required to wait just to put their request, but the turnaround time won't be decreased because the requests will still be waiting. So essentially, it is an illusion.

After this, when I realized that I've stretched this enough, I introduced Redis pubsub in the scene. Moreover, decoupled the whole app into components.
Master: A better, more rich, decoupled approach to the problem
Article content
Event-bus: a better approach using redis

Then I introduced Redis pubsub into the scene. It removed the queue. I made a few architectural choices to divide the whole system into components. I made efforts to keep them decoupled as much as I could.

Redis allowed multi-user support as it gave a distributed cache to store requests with a pubsub mechanism to notify workers. Native notify_all() was used previously to notify servers about a new request. But it had one major issue: I could notify them that a request had arrived, but couldn't directly publish the request to them. They had to read from a common, critical dictionary. Redis abstracted this a lot.

All clients were being exposed to an API. They could make requests, once picked up, track the progress, and get the history of all the completed requests. All this through simple HTTP calls.

Redis operated on a host and port. Each worker and the server initialized their own Redis instance. This proved to be a very decoupled and flexible approach.

Real-time updates were provided to the client about the completion of their request by the respective server. All this through SSE - Server-Sent Events.

I created a UI for it for easy testing. You can see the historical view and the client with the real-time updates:
Article content
The historical view giving live list of completed requests
Article content
The client view with real-time updates of the request


A Mature System and a future scope

The current master system is way more mature than where I started. It can be defined as follows:

A Distributed Request Dispatch System where work is broadcast to multiple workers. Ownership is determined through the first-claim mechanism. Workers stream real-time updates back to clients until completed.

And I bet this is not the end, but yet another checkpoint. There are many shortcomings in the system. First of all, it assumes everything is up and well. I have not made it very robust. It is highly dependent on Redis, and if it silently goes down, the whole system will be unusable. Moreover, the worker streams events to the client, so there is no two-way communication.

Given all of this, we can easily conclude there is a lot of future scope and the current system is nowhere close to the real world.

I will further spend my coming weeks revising it or perhaps trying new approaches.

Well, this wraps this edition too. Let’s meet next time! 