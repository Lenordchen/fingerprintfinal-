console.clear();
// button = createButton();
//Generate Tone
//
// const notes = [
//   'C4','E4','G4',
//   'C5','E5','G5'
// ];

function playTone() {
   const synth = new Tone.Synth();
   synth.toMaster();

   //synth.triggerAttackRelease('C4', '8n');
   const notes = [
     'C4','E4','G4',
     'C5','E5','G5'
   ];

   var index = 0;

   Tone.Transport.scheduleRepeat(function(time){
	   repeat(time);
   }, "8n");

   Tone.Transport.bpm.value = 120;

  function repeat(time) {
     let note = notes[index % notes.length];
     synth.triggerAttackRelease(note, '8n',time);
     index++;
  }

   Tone.Transport.start();

   setTimeout(function(){
     Tone.Transport.stop();
     },5000)
}



//control
let button_p = document.getElementById('sounds');
console.log(button_p);
button_p.onclick = function() {
  playTone()
};
