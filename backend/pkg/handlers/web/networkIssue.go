package web

import (
	. "openreplay/backend/pkg/messages"
)

type NetworkIssueDetector struct{}

func (f *NetworkIssueDetector) MessageTypes() []int {
	return []int{MsgNetworkRequest}
}

func (f *NetworkIssueDetector) Build() Message {
	return nil
}

func (f *NetworkIssueDetector) Handle(message Message, timestamp uint64) Message {
	msg := message.Decode().(*NetworkRequest)
	if msg.Status >= 400 {
		return &IssueEvent{
			Type:          "bad_request",
			MessageID:     message.MsgID(),
			Timestamp:     msg.Timestamp,
			ContextString: msg.URL,
		}
	}
	return nil
}
