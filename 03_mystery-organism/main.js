// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ['A', 'T', 'C', 'G'];
  return dnaBases[Math.floor(Math.random() * 4)];
};

// Returns a random single stand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = [];
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase());
  }
  return newStrand;
};

let pAequorFactory= (firstParam, secondParam) => {
  let specimenNum = firstParam;
  let dna = secondParam;

  return {
    specimenNum: specimenNum,
    dna: dna,
    mutate() {
      //randomly select base between 0 and 14
      let dnaIndex = Math.floor(Math.random() * (this.dna.length - 1));
      //get the dnabase from the dna
      let dnaIndexValue = this.dna[dnaIndex];
      //replace the value with someother dnabase value
      let dnaBases = ['A', 'T', 'C', 'G'];
      let dnaBaseIndex = dnaBases.indexOf(dnaIndexValue);
      dnaBases.splice(dnaBaseIndex);

      let newDnaBase = dnaBases[Math.floor(Math.random() * 3)];

      this.dna[dnaIndex] = newDnaBase;
      return dna;
    },

    compareDNA(pAequor) {
      let counter = this.dna.length;
      let matchCounter = 0;
      for(let i=0; i < counter; i++) {
        let dnaBase1 = this.dna[i];
        let dnaBase2 = pAequor.dna[i];

        if(dnaBase1 === dnaBase2) {
          matchCounter++;
        }
      }

      let totalPercentage = (matchCounter/counter)*100;
      totalPercentage = +totalPercentage.toFixed(2);

      return totalPercentage;
    },

    compareDNAWithLog(pAequor) {
      let totalPercentage = this.compareDNA(pAequor);

      console.log(`specimen ${this.specimenNum} and specimen ${pAequor.specimenNum} have ${totalPercentage}% DNA in common`);
    },

    willLikelySurvive() {
      let counter = this.dna.length;
      let matchCounter = 0;
      for(let i=0; i < counter; i++) {
        let dnaBase = this.dna[i];

        if(dnaBase === 'C' || dnaBase === 'G') {
          matchCounter++;
        }
      }

      let totalPercentage = (matchCounter/counter)*100;

      if(totalPercentage === 60) {
        return true;
      }
      return false;
    }
  };
}

let pAequorArray = [];
while(pAequorArray.length<30) {
  let pAequor = pAequorFactory(pAequorArray.length+1, mockUpStrand());
  if(pAequor.willLikelySurvive()) {
    pAequorArray.push(pAequor);
  }
}

console.log(pAequorArray[1]);
console.log(`pAequor 2 will likely survive? ${pAequorArray[1].willLikelySurvive()}`);

console.log(pAequorArray[4]);
console.log(pAequorArray[20]);
console.log(`pAequor 5 vs pAequor 21`);
pAequorArray[4].compareDNAWithLog(pAequorArray[20]);

let counter1 = 0;
let counter2 = 0;
let comparisionObjects = [];

for(;counter1<30;counter1++) {
  for(;counter2<30;counter2++) {
    if(counter1 === counter2) {
      continue;
    }

    let instance1 = pAequorArray[counter1];
    let instance2 = pAequorArray[counter2];

    let compareValue = instance1.compareDNA(instance2);
    comparisionObjects.push({dnaMatch: compareValue, instance1: instance1, instance2: instance2});
  }
}

counter1 = 1;
let maxValue = comparisionObjects[0].dnaMatch;
let maxIndex = 0;
for(;counter1<comparisionObjects.length;counter1++) {
  let newValue = comparisionObjects[counter1].dnaMatch;
  if(newValue > maxValue) {
    maxValue = newValue;
    maxIndex = counter1;
  }
}
console.log(`Two most related instances are ${comparisionObjects[maxIndex].instance1.dna} and ${comparisionObjects[maxIndex].instance2.dna}`);
console.log(`Maximum similarity is ${maxValue}%`);





