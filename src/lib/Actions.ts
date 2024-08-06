type Action = {
  title: string;
  description: string;
};

const actions: Action[] = [
  {
    title: "Uncover Something Old",
    description: `
One of the action types is Uncover Something Old. Reveal something
from before or during the occupation. It might present a problem, offer an
opportunity, or a bit of both. Draw it on the map. Drawings should be small and
simple: smaller than an inch, finished within thirty seconds.

We can use this action to introduce unresolved issues and dilemmas, resurfacing
the history of the community. It might even be something that is familiar to the
community members but surprising to us as players. When individual monsters
get introduced through this action, we'll give them names, and record those
names on our index card.

Some example situations:

- A mass grave is found north of the community.
- A pack of werebeasts emerges from the woods.
- Forgotten tales of the end times start to circulate.
- An ancient rite is completed for the first time since the occupation.
- An archaic religious symbol appears in the sky.
`,
  },
  {
    title: "Agree on Something",
    description: `
Another of the action types is Agree on Something. Open with a statement about
a problem or issue in the community. Going clockwise, everyone else then gets to
weigh in once, sharing their agreement with your statement or describing what
their silence looks like. Remember to indicate which monster is speaking… or
not speaking.

Agreeing on Something never results in a concrete decision. Everyone weighs
in (or stays silent), and then it's over. This is how conversations work in
communities: there is much left unsaid to preserve the peace.

Each agreement should be tied to a situation on the map. When an agreement
ends, mark the situation it is attached to with a small dot.

As an example, a community might agree on how to punish the ball of light
for failing to warn the community about problems at the wizard's tower. The
first player says “The Eidoo say 'We should punish Sol by locking him into the
tower.” The second player says “Tezog sits in silence, picking something from
his ear and then eating it, disinterested.” The third players says “The Wisps buzz
around and say 'Yes! Sol is dangerous.” The fourth player says “Sol radiates grief,
but stays silent.”

It's important that we stay concise. If any of us feel like we have more to say on a
topic, we can always Agree on Something about it at a later point.
  `,
  },
  {
    title: "Start a Project",
    description: `
The final action type is Start a Project. You choose a situation on the map,
and tell us how some of the monsters address it. It doesn't matter if the entire
community supports the project or not - work begins. Projects might focus
on decolonization efforts, the restoration of old customs or edifices, or new
endeavors that will move the community forward.

Some example projects:

- The mud wurms & Rothwen begin dismantling the fences that the humans built.
- We're teaching the draken tongue to our village young.
- Sordid leads several others in restoring the runic arches.

As a group, quickly decide how many weeks the project would reasonably take to
complete (minimum 1 and maximum 6). Remember that you are a community
in recovery. Many of your powers have lain dormant, and your traditions
acquired stigma. Is your community prepared to tackle this project? Must
healing and practice transpire first? Be generous with your assumptions, but do
remember that your community needs to build capacity slowly.

Place a die on the map wherever the project is taking place, with the die face
matching the number of weeks it will take to complete.
`,
  },
];

export { Action, actions };
