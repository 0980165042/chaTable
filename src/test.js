const array = [{day:"a",time:"12:23"},{day:"a",time:"11:23"},{day:"a",time:"11:20"}]
array.sort((a, b) => a.time - b.time)
console.log(array);