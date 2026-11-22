---
title: 'Sputnik and the Birth of Modern Computing'
excerpt: "A 58 cm metal sphere launched on 4 October 1957 led to ARPA, to funded computer science research, to ARPANET and to computers flying in spacecraft."
date: 2026-10-04
permalink: /posts/2026/10/sputnik-and-the-birth-of-modern-computing/
tags:
  - computing-history
  - history
  - hardware
  - education
---

On 4 October 1957 the Soviet Union put Sputnik 1 into orbit. It was a polished metal sphere about 58 cm across, weighing 83.6 kg, and it circled the Earth roughly every 98 minutes. It carried no camera and no scientific computer. All it did was transmit a radio beep. Yet that beep changed the direction of American science, and computing was one of the fields that changed most.

This post follows one thread: how a surprise in space led to new institutions, new money for research, a network that became the internet, and computers small enough to fly to the Moon.

## The shock and the response

The launch caught the American public and government off guard. Sputnik was far larger than the planned US Vanguard payload, which weighed only a few pounds, and many people feared that a rocket able to lift it could also deliver a nuclear weapon. The Defense Department quickly approved a second satellite project, and Explorer 1 reached orbit on 31 January 1958 and discovered the Van Allen radiation belts.

The deeper response was institutional. According to DARPA's own history, the Soviet launch triggered the events that led to the creation of the Advanced Research Projects Agency, ARPA, on 7 February 1958. The agency's purpose, in its present-day wording, is to create and prevent technological surprise. Sputnik was exactly such a surprise, and ARPA was designed so that it would not happen again.

Civilian space work went elsewhere. Congress passed the National Aeronautics and Space Act in July 1958, President Eisenhower signed it on 29 July, and NASA opened for business on 1 October 1958. So within a year of Sputnik, the United States had one agency for long-range defense research and another for space.

## A new kind of research money

ARPA did not stay a space agency. Over the next few years it became one of the main sponsors of computer research, and the person who shaped that role was J.C.R. Licklider. In 1962 he became the first head of ARPA's computer research program, which he called the Information Processing Techniques Office, or IPTO.

Licklider's office funded universities directly and gave researchers long time horizons. One example, recorded by the Computer History Museum, is MIT's Project MAC, which in 1964 acquired a GE-635 computer with IPTO funding and began developing the Multics time-sharing system. Multics later influenced Unix, and Unix influenced almost everything that followed.

Time-sharing mattered because it changed what a computer was. Before it, a machine ran one job at a time, and a programmer handed a deck of cards to an operator and waited. With time-sharing, many users could work interactively on the same machine. That idea is the ancestor of the process scheduler you study in an [operating systems course](/teaching/operating-systems/?lang=en): the CPU is divided into small slices so that each user feels they own the machine.

## From a vision to ARPANET

Licklider also described what he called an "Intergalactic Network", a world in which computers were connected so that people could reach programs and data anywhere. In 1965 Larry Roberts connected computers at MIT and in Santa Monica over telephone lines. The experiment showed that ordinary phone circuits were inefficient for computer traffic and that packet switching looked more promising. Paul Baran in the United States and Donald Davies in Britain had developed the packet idea in parallel, and Davies gave it its name.

The practical design came together in the late 1960s. Each major computer would be fronted by a small dedicated machine, the Interface Message Processor, or IMP. In December 1968 the firm Bolt, Beranek and Newman won the contract to build the IMPs. These devices were the ancestors of today's routers.

On 29 October 1969 the first host-to-host connection on the ARPANET was made from UCLA to the Stanford Research Institute. The first attempt to log in crashed the remote machine, and the second attempt worked. Four sites were chosen for the first stage of the network: UCLA, SRI, UC Santa Barbara and the University of Utah.

Notice how modest this beginning was. Four nodes, a few machines and a failed first login. Steve Crocker's "Request for Comments" memo of April 1969 started the RFC series, and that open, documented way of agreeing on standards still governs how internet protocols are written. From the ARPANET, through protocol standardization and later networks such as NSFNET, the path leads to the internet we use today.

## Computers on the way to the Moon

The space race also pushed computers to become smaller, lighter and more reliable. The Apollo Guidance Computer, designed at MIT, is a good example. NASA's own history of computers in spaceflight records that the Block II version measured 24 by 12.5 by 6 inches and weighed 70.1 pounds. Its memory grew far beyond the first estimates: MIT originally proposed 4K words of fixed memory and 256 words of erasable memory, and the final machine had 36K words of fixed and 2K words of erasable memory.

Those numbers are worth showing to students. Modern programs often waste more memory than the entire guidance system used to land people on the Moon. The Apollo engineers could not afford that. They counted every word and had to make sure their code would run in real time on a machine with no spare capacity. If you want a feel for that discipline, the [microprocessors course](/teaching/microprocessors/?lang=en) on 8086 assembly teaches the same habits at a smaller scale.

## Why it still matters

Sputnik teaches several lessons that go beyond history.

First, a shock can be useful if an institution knows how to turn it into long-term investment. ARPA did not try to win a single race. It funded people and ideas, and let results emerge over decades.

Second, technologies connect in unexpected ways. A rocket launch led to a defense agency, the agency funded time-sharing, time-sharing led to networking, and networking led to the internet. Nobody planned that sequence in 1957.

Third, constraints produce good engineering. Apollo's tiny memory, and ARPANET's four fragile nodes all forced clear thinking.

Finally, it is a reminder that research is a public good. Much of what we call modern computing began as publicly funded, openly documented work, and the habit of publishing it for others to build on is one reason it grew so fast. Nearly seven decades later, the beep from a metal sphere is still a good reason to take basic research seriously.

**Sources:** [DARPA, The Sputnik Surprise](https://www.darpa.mil/about/innovation-timeline/sputnik-surprise), [NASA, Sputnik Historical Resources](https://www.nasa.gov/history/sputnik/index.html), [Computer History Museum, Internet History of the 1960s](https://www.computerhistory.org/internethistory/1960s), [NASA, Computers in Spaceflight](https://www.nasa.gov/wp-content/uploads/static/history/computers/Ch2-5.html)
