import moment from "moment"
import React, {PropTypes} from "react"
import {connect} from "react-redux"
import ReplyBox from "./ReplyBox"

export class Chat extends React.Component {
    render () {
        return (
            <div style={rootStyle}>
                <ul style={ulStyle} ref="messages">
                    {this.props.messages.map(renderMessage)}
                </ul>
                <ReplyBox/>
                </div>

        )
    }

    componentDidUpdate (prevProps) {
        if (prevProps.messages.length === this.props.messages.length) {
            return
        }

        const element = this.refs.messages
        if (element) {
            element.scrollTop = element.scrollHeight
        }
    }
}
function renderMessage (message) {
    return (
        <li key={message.messageId}>

            <img style= {imageStyle} src = {message.author.picture} height = "64" />
            <span style={{color:"yellow",fontFamily:"arial"}}>{message.author.name + ": "}</span>

            {getMessageBody(message)}
        </li>
    )
}

const ulStyle = {
    overflowY: "scroll",
    listStyle: "none"

}

const imageStyle = {
    maxWidth: "100px",
    maxHeight: "100px",
    borderRadius: "100px",
    objectFit: "contain"
}

const rootStyle = {
    backgroundColor: "skyblue",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
    height: "100%"
}

function getMessageDate (message) {
    return moment(message.timestampUtc).format("dddd, h:mm A")
}

function getMessageBody (message) {
    if (message.data) {
        return <img src={message.data} style={imageStyle} />
    }
    else
    {

        return <span style={{color:"navy",fontFamily:"courier new"}}>
            {message.text}
          </span>
    }
}

Chat.propTypes = {
    messages: PropTypes.array
}

function mapStateToProps (state) {
    return {
        messages: state.messages
    }
}

export default connect(
    mapStateToProps
)(Chat)
