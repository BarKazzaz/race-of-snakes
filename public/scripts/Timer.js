function Timer(minutes) {
    this.minutes = minutes;
    this.seconds = 0;
    this.started = false;
    this.finished = false;

    this.start = function() {
        if (this.started) return;
        let interval = setInterval(() => {
            this.seconds -= 1;
            if (this.seconds <= 0) {
                if (this.minutes <= 0) {
                    this.finished = true;
                    clearInterval(interval);
                }
                this.seconds = 59;
                this.minutes -= 1;
            }
        }, 1000)
        this.started = true;
    }
}