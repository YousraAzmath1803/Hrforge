class MessageParser {
    constructor(actionProvider) {
      this.actionProvider = actionProvider;
    }
  
    parse(message) {
      const lowerCaseMessage = message.toLowerCase();
  
      if (lowerCaseMessage.includes("leave")) {
        this.actionProvider.handleLeaveRequest();
      } else if (lowerCaseMessage.includes("attendance")) {
        this.actionProvider.handleAttendanceRequest();
      } else {
        this.actionProvider.handleUnknownRequest();
      }
    }
  }
  
  export default MessageParser;
  