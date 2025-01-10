class ActionProvider {
    constructor(createChatBotMessage, setStateFunc) {
      this.createChatBotMessage = createChatBotMessage;
      this.setState = setStateFunc;
    }
  
    handleLeaveRequest = () => {
      const message = this.createChatBotMessage("You can request leave via the HRMS leave section.");
      this.setState(prev => ({ ...prev, messages: [...prev.messages, message] }));
    };
  
    handleAttendanceRequest = () => {
      const message = this.createChatBotMessage("Your attendance records can be found under the Attendance section.");
      this.setState(prev => ({ ...prev, messages: [...prev.messages, message] }));
    };
  
    handleUnknownRequest = () => {
      const message = this.createChatBotMessage("I'm not sure how to help with that. Can you clarify?");
      this.setState(prev => ({ ...prev, messages: [...prev.messages, message] }));
    };
  }
  
  export default ActionProvider;
  