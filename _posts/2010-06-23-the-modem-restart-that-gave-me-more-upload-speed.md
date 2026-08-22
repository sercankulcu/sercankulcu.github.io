---
title: "The Modem Restart That Gave Me More Upload Speed"
date: 2010-06-23
permalink: /posts/2010/06/the-modem-restart-that-gave-me-more-upload-speed/
tags:
   - internet
   - turk-telekom
   - technology
   - memories
   - humor
---

There was a period when internet problems were not background annoyances.

They were events.

You noticed every kilobit.

You knew what speed you were supposed to have.

You knew what speed you actually had.

You stared at modem statistics.

You restarted hardware.

You called customer support.

And sometimes, after thirty minutes of explaining a technical problem, the recommended solution was the most universal instruction in the history of consumer electronics:

Turn it off and turn it on again.

In June 2010, I had one of those encounters with Türk Telekom.

The story actually began with them calling me.

Someone on the phone asked whether they were speaking to me.

My first thought was predictable:

What campaign are they going to try to sell me this time?

I said yes.

Then came the unexpected sentence.

Their system was having a problem, so they could not access my information.

Could they call me later?

Think about that for a moment.

They had called me.

They knew enough to dial my number.

They knew enough to ask for me by name.

But after I answered, their system apparently stopped cooperating.

So the call had reached the stage where the caller was asking permission to call again because the system used to support the first call was not working.

My answer was simple:

If possible, do not call at all.

Customer-service conversations often generate this peculiar kind of comedy.

Nobody involved is necessarily doing anything wrong.

The employee is following the system.

The customer is reacting to the system.

The system itself has produced an interaction so absurd that both people are trapped inside it.

Years later, we would call this a workflow problem.

At the time, I called it something closer to:

Are you people kidding me?

That alone would have been enough for an entry.

But the better part came later.

I noticed that my upload speed was wrong.

It was supposed to be around 128k.

Instead, I was seeing roughly 32k.

Those numbers sound almost archaeological today.

But in 2010 they mattered.

When speeds are small, differences feel enormous.

Losing 96 kilobits is not an abstract percentage.

You feel it.

Uploading becomes slower.

Connections feel different.

Everything you do reminds you that something is not as it should be.

So I called support.

This is where every technically inclined customer enters a psychological danger zone.

You know enough to observe the problem.

Maybe enough to diagnose parts of it.

But the person on the phone has a script.

The script does not know that you know.

You explain the issue.

The support flow asks you questions whose answers you already checked.

Is the modem connected?

Yes.

Are the lights on?

Yes.

Can you restart it?

Yes, I can restart it.

No, I do not believe restarting it explains why the provisioned upload speed appears to be wrong.

But the script has momentum.

Customer support is one of the few places where an engineer can become irrationally offended by perfectly reasonable basic troubleshooting.

We think:

Do they believe I know nothing?

The support agent thinks:

Most problems are solved by these steps.

Both can be right.

That tension creates excellent irritation.

In my old entry, I felt as though they were treating me like someone who could not possibly understand the numbers I was looking at.

The emotional translation was:

What could you possibly know about this?

That upload speed is already more than enough for you.

Maybe nobody literally said that.

But that was how the interaction felt.

Eventually, the advice came:

Restart the modem.

Fine.

I restarted the modem.

Then I checked the connection again.

My upload speed had not returned to 128k.

It was now around 160k.

This was not the expected outcome.

I had called because I was getting less than the normal value.

After the fix, I was getting more than the normal value.

I began imagining the customer-service interface.

Somewhere, perhaps, there was a button.

Not:

Set upload speed to 128k.

But:

Increase upload speed by 128k.

Someone had clicked it.

My 32 had become 160.

Problem solved.

Sort of.

This was almost certainly not the literal mechanism.

But it was a satisfying explanation.

Engineers love inventing hypothetical implementations for absurd behavior.

When software produces an unexpected result, one of the fastest ways to make sense of it is to imagine what kind of bad code could have produced exactly that result.

Expected:

128.

Current:

32.

After intervention:

160.

Ah.

Of course.

Someone added 128.

Case closed.

This kind of reasoning is half debugging and half comedy.

It is also one of the ways technical people cope with systems they cannot inspect.

If the source code is unavailable, we reverse-engineer through behavior.

What input went in?

What output came out?

What hidden state would explain the transition?

We do this with software.

Networks.

Organizations.

Bureaucracies.

People.

Sometimes accurately.

Often creatively.

The important part of the story was that I still had not solved my original problem.

My practical concern was download performance.

I had hoped that fixing the line configuration would return everything to normal.

Instead, I had somehow acquired extra upload capacity while the thing I actually cared about remained uncertain.

This is a familiar class of technical problem.

You fix the wrong metric.

The dashboard turns green.

The user is still unhappy.

A system can improve numerically without improving experientially.

This happens everywhere.

CPU usage drops.

Latency gets worse.

Memory consumption improves.

Throughput collapses.

Support tickets are closed faster.

Customers need to reopen them.

Average response time improves.

The answers become less useful.

A metric is not the objective.

It is a representation of the objective.

That distinction is easy to forget.

My line now had a better upload number.

Great.

That was not why I had called.

This is probably one of the earliest forms in which I encountered a lesson that later became important professionally:

Do not optimize the number while losing the problem.

Engineers are especially vulnerable to measurable success.

Numbers are satisfying.

They give us evidence.

The danger is selecting a number that is only loosely connected to what matters.

If the customer says:

My internet feels wrong,

the engineer wants a measurement.

Good.

Measure.

But the measurement must still connect back to the experience.

Otherwise the system can be technically compliant and practically useless.

The reverse also happens.

A system may violate a nominal number and still work perfectly for the user.

Which raises another awkward question:

When is a specification the truth, and when is the behavior the truth?

In production, both matter.

The contract may say 128.

The system may deliver 160.

The user may not complain.

Is that a problem?

Technically, maybe.

Operationally, perhaps not.

Until some other part of the network assumes 128.

Then generosity becomes a bug.

Systems are full of these hidden dependencies.

This was why the unexpected increase amused me but did not make me completely comfortable.

Unexpected good behavior is still unexpected behavior.

If I asked for one thing and the system produced another, I wanted to know why.

This is a deeply engineering reaction.

A normal user might say:

Faster? Excellent.

Do not touch anything.

An engineer says:

Why is it faster?

Should it be?

What changed?

Can I reproduce it?

Will it stay this way?

What else did they accidentally change?

This tendency makes life less peaceful.

It also prevents surprises later.

The modem restart itself deserves some respect.

Technical people love mocking restart advice.

It sounds primitive.

Turn it off.

Turn it on.

Yet restarting works for an embarrassing number of real problems.

State accumulates.

Processes get stuck.

Connections become stale.

Buffers fill.

Devices enter strange conditions.

Configuration gets renegotiated.

A restart destroys hidden state.

That is powerful.

The technique feels unsophisticated only because it solves many sophisticated failures without requiring us to understand them.

This creates a conflict.

As engineers, we want root cause.

As users, we want the thing to work.

Sometimes these goals align.

Sometimes the restart wins.

There is a difference between recovery and diagnosis.

Restarting may recover the system.

It may teach you almost nothing about why the system failed.

In a home internet problem, recovery may be enough.

In an aircraft system, medical device, payment platform, or industrial controller, probably not.

Context determines how much ignorance is acceptable.

That is an important engineering judgment.

Not every failure deserves a full investigation.

Not every failure can be ignored after a reboot either.

The difficult part is knowing which is which.

My 2010 internet connection existed on the harmless end of that spectrum.

If the modem behaved strangely, nobody died.

I could experiment.

Restart.

Measure.

Call again.

Complain.

Make jokes.

This made consumer technology an excellent training ground for systems thinking.

Home computers taught people about memory.

Printers taught them about drivers.

Routers taught them about networking.

Slow disks taught them about storage.

Internet providers taught them about infrastructure and patience.

You did not need a laboratory.

Ordinary life supplied broken systems for free.

That generation of internet users became unusually aware of connection mechanics because the connections were imperfect enough to expose themselves.

Today, many users do not know their upload speed.

They do not need to.

The system is fast enough that the abstraction holds.

That is success.

Good infrastructure becomes invisible.

You notice electricity mainly when it fails.

You notice DNS mainly when it fails.

You notice bandwidth mainly when it is insufficient.

Technology matures by disappearing from attention.

In 2010, home internet had not disappeared for me.

I watched it.

Measured it.

Argued with it.

The numbers were part of daily experience.

This also produced a particular relationship with service providers.

Half frustration.

Half affection.

In the old entry, after complaining at length, I still wrote that I liked them.

That contradiction feels accurate.

We complain most about the services we depend on.

Internet providers.

Banks.

Mobile operators.

Operating systems.

Employers.

Cities.

The relationship is not simple hatred.

If it were, we would leave immediately.

Dependence creates familiarity.

Familiarity creates complaint.

Complaint becomes a form of ongoing relationship.

You know the company's habits.

The scripts.

The usual fixes.

The recurring problems.

You become a reluctant expert in someone else's system.

Then one day they accidentally give you more upload speed than you asked for.

And you think:

Fine.

Maybe we can continue this relationship.

The old numbers are almost charming now.

32k.

128k.

160k.

We once watched those values carefully.

A difference of a few dozen kilobits could justify a support call.

Technology changes scale so quickly that yesterday's serious constraints become today's historical jokes.

But the structure of the story has not changed.

A service behaves strangely.

A technically curious user measures it.

Support follows a script.

The recommended fix seems too simple.

The fix changes something unexpected.

The original problem is only partially solved.

Everyone moves on.

That pattern is timeless.

So is the final engineering question:

What exactly did they change?

I never knew.

Perhaps somebody adjusted a profile.

Perhaps the modem renegotiated differently.

Perhaps my interpretation of the values was incomplete.

Perhaps several things changed at once.

The archive supports only what I observed:

I expected about 128k upload.

I saw about 32k.

After the support interaction and modem restart, I saw about 160k.

Everything beyond that was speculation.

Including my favorite explanation:

Somewhere at Türk Telekom, there had to be a button that said:

Add 128.

It probably did not exist.

But if you had seen the result, you might have believed in it too.
