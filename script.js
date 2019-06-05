function pad0(value) {
    let result = value.toString();
    if (result.length < 2) {
        result = '0' + result;
    }
    return result;
}

class Stopwatch extends React.Component{
    className;
    constructor(display) {
        super(display);
        this.state = {
            running: false,
            minutes: 0,
            seconds: 0,
            miliseconds: 0
        };
        this.print(this.times);
    }

    print() {
        this.display.innerText = this.format(this.times);
    };

    static format(times) {
        return `${pad0(times.minutes)}:${pad0(times.seconds)}:${pad0(Math.floor(times.miliseconds))}`;
    };

    start() {
        if (!this.running) {
            this.running = true;
            this.watch = setInterval(() => this.step(), 10);
        }
    };

    step() {
        if(!this.running) return;
        this.calculate();
        this.print();
    };

    calculate() {
        this.times.miliseconds += 1;
        if (this.times.miliseconds >= 100) {
            this.times.seconds += 1;
            this.times.miliseconds = 0;
        }
        if (this.times.seconds >= 60) {
            this.times.minutes += 1;
            this.times.seconds = 0;
        }
    };

    stop() {
        this.setState({
            running: false
        });
        clearInterval(this.watch);
    };

    render() {
        return (
            <div className={'app'} id={'app'}>
                <button onClick={this.start}>Start</button>
                <button onClick={this.stop}>Stop</button>
                <p className={'stopwatch'}>
                    {this.format({
                        minutes: this.times.minutes,
                        seconds: this.times.seconds,
                        miliseconds: this.times.miliseconds
                    })}
                </p>
            </div>
        )
    };
}

const stopwatch = React.createElement(Stopwatch);
ReactDOM.render(stopwatch, document.getElementById('app'));
