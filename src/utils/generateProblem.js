import { pick, rand, plural } from "../utils";
import { ITEMS, NAMES } from "../constants";

// Reality-based story templates per object type (addition and subtraction)
function getStoryTemplates(itemWord, n1, n2, a, b) {
  const w = (n) => plural(itemWord, n);
  const w2 = plural(itemWord, 2);

  const byWord = {
    apple: {
      add: [
        `${n1} has ${a} ${w(a)}. ${n2} gives ${n1} ${b} more. How many ${w2} does ${n1} have now?`,
        `There are ${a} ${w(a)} in the fruit bowl. ${n1} adds ${b} more. How many in total?`,
        `${n1} picked ${a} ${w(a)} from the tree and ${b} more from the garden. How many ${w2} in total?`,
      ],
      sub: [
        `${n1} had ${a} ${w(a)}. ${n1} gave ${b} to ${n2}. How many does ${n1} have left?`,
        `There were ${a} ${w(a)} on the table. ${n1} ate ${b}. How many are left?`,
      ],
    },
    orange: {
      add: [
        `${n1} has ${a} ${w(a)}. ${n2} brings ${n1} ${b} more. How many ${w2} does ${n1} have now?`,
        `There are ${a} ${w(a)} in the bowl. ${n1} adds ${b} more. How many in total?`,
        `${n1} picked ${a} ${w(a)} and ${n2} picked ${b} more. How many ${w2} in total?`,
      ],
      sub: [
        `${n1} had ${a} ${w(a)}. ${n1} gave ${b} to ${n2}. How many does ${n1} have left?`,
        `There were ${a} ${w(a)}. ${n1} used ${b} for juice. How many are left?`,
      ],
    },
    star: {
      add: [
        `${n1} drew ${a} ${w(a)} on the page. ${n2} drew ${b} more. How many ${w2} in total?`,
        `${n1} has ${a} gold ${w(a)} and gets ${b} more. How many ${w2} does ${n1} have now?`,
        `There are ${a} ${w(a)} on the chart. ${n1} adds ${b} more. How many in total?`,
      ],
      sub: [
        `${n1} had ${a} ${w(a)}. ${n1} gave ${b} to ${n2}. How many does ${n1} have left?`,
        `There were ${a} ${w(a)}. ${n1} used ${b} for a project. How many are left?`,
      ],
    },
    balloon: {
      add: [
        `${n1} has ${a} ${w(a)}. ${n2} brings ${n1} ${b} more. How many ${w2} does ${n1} have now?`,
        `There are ${a} ${w(a)} at the party. ${n1} blows up ${b} more. How many in total?`,
        `${n1} tied ${a} ${w(a)} to the fence and ${b} more to the gate. How many ${w2} in total?`,
      ],
      sub: [
        `${n1} had ${a} ${w(a)} but ${b} flew away. How many are still here?`,
        `There were ${a} ${w(a)}. ${b} popped. How many are left?`,
      ],
    },
    "pizza slice": {
      add: [
        `There are ${a} ${w(a)} on the table. ${n1} brings ${b} more. How many in total?`,
        `${n1} has ${a} ${w(a)}. ${n2} orders ${b} more. How many ${w2} does ${n1} have now?`,
        `${n1} ate ${a} ${w(a)} at lunch and ${b} more at dinner. How many ${w2} in total?`,
      ],
      sub: [
        `${n1} had ${a} ${w(a)}. ${n1} shared ${b} with ${n2}. How many does ${n1} have left?`,
        `There were ${a} ${w(a)}. ${n1} ate ${b}. How many are left?`,
      ],
    },
    puppy: {
      add: [
        `${n1} has ${a} ${w(a)}. ${n2} brings ${n1} ${b} more to play. How many ${w2} in total?`,
        `There are ${a} ${w(a)} in the park. ${n1} sees ${b} more. How many ${w2} does ${n1} see now?`,
        `${n1} saw ${a} ${w(a)} in the garden and ${b} more by the pond. How many in total?`,
      ],
      sub: [
        `${n1} had ${a} ${w(a)}. ${n1} gave ${b} to ${n2} to adopt. How many does ${n1} have left?`,
        `There were ${a} ${w(a)}. ${b} went home. How many are still here?`,
      ],
    },
    butterfly: {
      add: [
        `${n1} saw ${a} ${w(a)} in the garden and ${b} more near the flowers. How many in total?`,
        `There are ${a} ${w(a)} on the bush. ${n1} counts ${b} more. How many ${w2} in total?`,
        `${n1} spotted ${a} ${w(a)} and then ${b} more. How many ${w2} did ${n1} see?`,
      ],
      sub: [
        `${n1} had ${a} ${w(a)} but ${b} flew away. How many are still here?`,
        `There were ${a} ${w(a)}. ${b} flew off. How many are left?`,
      ],
    },
    flower: {
      add: [
        `${n1} has ${a} ${w(a)} in the vase. ${n2} gives ${n1} ${b} more. How many ${w2} in total?`,
        `${n1} picked ${a} ${w(a)} in the garden and ${b} more by the fence. How many in total?`,
        `There are ${a} ${w(a)} on the table. ${n1} adds ${b} more. How many are there now?`,
      ],
      sub: [
        `${n1} had ${a} ${w(a)}. ${n1} gave ${b} to ${n2}. How many does ${n1} have left?`,
        `There were ${a} ${w(a)}. ${n1} took ${b} to school. How many are left?`,
      ],
    },
    gift: {
      add: [
        `There are ${a} ${w(a)} under the tree. ${n1} adds ${b} more. How many in total?`,
        `${n1} has ${a} ${w(a)}. ${n2} brings ${n1} ${b} more. How many ${w2} does ${n1} have now?`,
        `${n1} wrapped ${a} ${w(a)} and ${b} more. How many ${w2} in total?`,
      ],
      sub: [
        `${n1} had ${a} ${w(a)}. ${n1} gave ${b} to ${n2}. How many does ${n1} have left?`,
        `There were ${a} ${w(a)}. ${n1} opened ${b}. How many are left?`,
      ],
    },
    cat: {
      add: [
        `${n1} has ${a} ${w(a)}. ${n2} brings ${n1} ${b} more to visit. How many ${w2} in total?`,
        `There are ${a} ${w(a)} in the room. ${n1} sees ${b} more. How many ${w2} does ${n1} see?`,
        `${n1} saw ${a} ${w(a)} in the garden and ${b} more on the wall. How many in total?`,
      ],
      sub: [
        `${n1} had ${a} ${w(a)}. ${n1} gave ${b} to ${n2}. How many does ${n1} have left?`,
        `There were ${a} ${w(a)}. ${b} ran outside. How many are still here?`,
      ],
    },
    painting: {
      add: [
        `There are ${a} ${w(a)} on the wall. ${n1} hangs ${b} more. How many in total?`,
        `${n1} has ${a} ${w(a)} in the gallery. ${n2} brings ${n1} ${b} more. How many ${w2} now?`,
        `${n1} painted ${a} ${w(a)} and ${b} more. How many ${w2} in total?`,
      ],
      sub: [
        `${n1} had ${a} ${w(a)}. ${n1} gave ${b} to ${n2}. How many does ${n1} have left?`,
        `There were ${a} ${w(a)}. ${n1} sold ${b}. How many are left?`,
      ],
    },
    microphone: {
      add: [
        `There are ${a} ${w(a)} on stage. ${n1} brings ${b} more. How many in total?`,
        `${n1} has ${a} ${w(a)} in the studio. ${n2} sets up ${b} more. How many ${w2} now?`,
        `${n1} used ${a} ${w(a)} for the band and ${b} more for the choir. How many ${w2} in total?`,
      ],
      sub: [
        `${n1} had ${a} ${w(a)}. ${n1} lent ${b} to ${n2}. How many does ${n1} have left?`,
        `There were ${a} ${w(a)} on stage. ${n1} put ${b} away. How many are left?`,
      ],
    },
    piano: {
      add: [
        `There are ${a} ${w(a)} in the music room. ${n1} adds ${b} more. How many in total?`,
        `${n1} has ${a} ${w(a)}. ${n2} brings ${n1} ${b} more. How many ${w2} does ${n1} have now?`,
        `${n1} played ${a} ${w(a)} in the morning and ${b} more in the evening. How many ${w2} in total?`,
      ],
      sub: [
        `${n1} had ${a} ${w(a)}. ${n1} gave ${b} to ${n2}. How many does ${n1} have left?`,
        `There were ${a} ${w(a)}. ${n1} moved ${b} to another room. How many are left?`,
      ],
    },
    violin: {
      add: [
        `There are ${a} ${w(a)} in the orchestra. ${n1} brings ${b} more. How many in total?`,
        `${n1} has ${a} ${w(a)}. ${n2} brings ${n1} ${b} more. How many ${w2} now?`,
        `${n1} saw ${a} ${w(a)} in the shop and ${b} more at school. How many ${w2} in total?`,
      ],
      sub: [
        `${n1} had ${a} ${w(a)}. ${n1} lent ${b} to ${n2}. How many does ${n1} have left?`,
        `There were ${a} ${w(a)}. ${n1} put ${b} away. How many are left?`,
      ],
    },
    guitar: {
      add: [
        `There are ${a} ${w(a)} in the band room. ${n1} brings ${b} more. How many in total?`,
        `${n1} has ${a} ${w(a)}. ${n2} brings ${n1} ${b} more. How many ${w2} does ${n1} have now?`,
        `${n1} played ${a} ${w(a)} and ${n2} brought ${b} more. How many ${w2} in total?`,
      ],
      sub: [
        `${n1} had ${a} ${w(a)}. ${n1} lent ${b} to ${n2}. How many does ${n1} have left?`,
        `There were ${a} ${w(a)}. ${n1} sold ${b}. How many are left?`,
      ],
    },
    trumpet: {
      add: [
        `There are ${a} ${w(a)} in the band. ${n1} brings ${b} more. How many in total?`,
        `${n1} has ${a} ${w(a)}. ${n2} brings ${n1} ${b} more. How many ${w2} now?`,
        `${n1} saw ${a} ${w(a)} at practice and ${b} more at the concert. How many ${w2} in total?`,
      ],
      sub: [
        `${n1} had ${a} ${w(a)}. ${n1} lent ${b} to ${n2}. How many does ${n1} have left?`,
        `There were ${a} ${w(a)}. ${n1} put ${b} away. How many are left?`,
      ],
    },
    rose: {
      add: [
        `${n1} has ${a} ${w(a)} in the vase. ${n2} gives ${n1} ${b} more. How many ${w2} in total?`,
        `${n1} picked ${a} ${w(a)} in the garden and ${b} more from the shop. How many in total?`,
        `There are ${a} ${w(a)} on the table. ${n1} adds ${b} more. How many are there now?`,
      ],
      sub: [
        `${n1} had ${a} ${w(a)}. ${n1} gave ${b} to ${n2}. How many does ${n1} have left?`,
        `There were ${a} ${w(a)}. ${n1} took ${b} to the party. How many are left?`,
      ],
    },
  };

  const templates = byWord[itemWord];
  if (templates) {
    return { add: templates.add, sub: templates.sub };
  }
  // Fallback for any new item
  return {
    add: [
      `${n1} has ${a} ${w(a)}. ${n2} gives ${n1} ${b} more. How many ${w2} does ${n1} have now?`,
      `There are ${a} ${w(a)}. ${n1} adds ${b} more. How many in total?`,
    ],
    sub: [
      `${n1} had ${a} ${w(a)}. ${n1} gave ${b} to ${n2}. How many does ${n1} have left?`,
      `There were ${a} ${w(a)}. ${n1} took ${b} away. How many are left?`,
    ],
  };
}

export function generateProblem(level) {
  const ranges = [
    { max: 5, ops: ["+"] },
    { max: 10, ops: ["+"] },
    { max: 10, ops: ["+", "-"] },
    { max: 20, ops: ["+", "-"] },
    { max: 50, ops: ["+", "-"] },
  ];
  const { max, ops } = ranges[Math.min(level - 1, 4)];
  const op = pick(ops);
  let a, b, answer;
  if (op === "+") {
    a = rand(1, Math.min(max, 25));
    b = rand(1, Math.min(max - (a > max ? 0 : a) || 1, 25));
    answer = a + b;
  } else {
    a = rand(2, Math.min(max, 25));
    b = rand(1, a - 1 || 1);
    answer = a - b;
  }
  const item = pick(ITEMS);
  const n1 = pick(NAMES);
  let n2 = pick(NAMES);
  while (n2 === n1) n2 = pick(NAMES);

  const { add: storyAdd, sub: storySub } = getStoryTemplates(item.word, n1, n2, a, b);
  const story = op === "+" ? pick(storyAdd) : pick(storySub);

  return {
    a,
    b,
    op,
    answer,
    emoji: item.emoji,
    itemWord: item.word,
    story,
    numericText: `What is ${a} ${op === "+" ? "plus" : "minus"} ${b}?`,
    visualText: `Count the ${plural(item.word, 2)}: ${a} ${op === "+" ? "and" : "take away"} ${b}. How many?`,
  };
}
