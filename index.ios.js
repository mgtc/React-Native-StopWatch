var React = require('react-native'),
  formatDate = require('minutes-seconds-milliseconds'),
  {
    View,
    Text,
    AppRegistry,
    TouchableHighlight,
    StyleSheet
  } = React;

var StopWatch = React.createClass({
  getInitialState: function() {
    return {
      timeElapsed: null,
      running: false,
      startTime: null,
      laps: []
    };
  },
  render: function() {
    return <View style={styles.container}>
      <View style={[styles.header]}>
        <View style={[styles.timerWrapper]}>
          <Text style={styles.timer}>{formatDate(this.state.timeElapsed)}</Text>
        </View>
        <View style={[styles.actions]}>
          {this.startStopButton()}
          {this.lapButton()}
        </View>
      </View>
      <View style={[styles.footer]}>
        {this.showLaps()}
      </View>
    </View>;
  },
  showLaps: function() {
    return this.state.laps.map(function(lap, index) {
      return <View style={styles.lap}>
        <Text style={styles.lapText}>
          计次 #{index + 1}: {formatDate(lap)}
        </Text>
      </View>
    });
  },
  startStopButton: function() {
    return <TouchableHighlight
      underlayColor="blue"
      onPress={this.onStartStopClick}
      style={[styles.button, this.state.running ? styles.stopButton : styles.startButton]}>
      <Text>
        {this.state.running ? '停止' : '开始'}
      </Text>
    </TouchableHighlight>
  },
  lapButton: function() {
    return <TouchableHighlight
      style={styles.button}
      underlayColor="grey"
      onPress = {this.updateLap}>
      <Text>
        计次
      </Text>
    </TouchableHighlight>;
  },
  updateLap: function() {
    var lap = this.state.timeElapsed;
    this.setState({
      laps: this.state.laps.concat([lap]),
      startTime: new Date()
    });
  },
  onStartStopClick: function() {
    if(this.state.running) {
      clearInterval(this.timer);
      this.setState({
        running: false
      });
      return;
    }

    this.setState({
      startTime : new Date()
    });
    this.timer = setInterval(() => {
      this.setState({
        timeElapsed : new Date() - this.state.startTime,
        running: true
      });
    }, 30);
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1, // Fill the entire screen
    alignItems: 'stretch'
  },
  header: { //Yellow
    flex: 1
  },
  footer: { //Blue
    flex: 1
  },
  timerWrapper: {
    flex: 5,
    alignItems: 'center',
    justifyContent: 'center'
  },
    timer: {
    fontSize: 60
  },
  actions: {
    flex: 3,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  button: {
    borderWidth: 2,
    height: 100,
    width: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center'
  },
  startButton: {
    borderColor: '#5FB404'
  },
  stopButton: {
    borderColor: '#FF0000'
  },
  lap: {
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  lapText: {
    fontSize: 30
  }
});

AppRegistry.registerComponent('stopwatch', () => StopWatch);
