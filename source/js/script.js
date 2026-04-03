class Timer {
    constructor(timerSection) {
        let timer = 60;
        const Tleft = setInterval(() =>{
            if (timer <= 0){
                clearInterval(Tleft);
                console.log("Time is up!");
            }
            else {
                console.log(timer + " seconds left!");
                timer--;
            }
        }, 1000);
    }
} // Working on timer rn ^ Hayden