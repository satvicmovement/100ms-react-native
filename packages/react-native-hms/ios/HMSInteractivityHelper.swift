//
//  HMSInteractivityHelper.swift
//  react-native-hms
//
//  Created by Jatin Nagar on 09/01/24.
//

import Foundation
import HMSSDK

class HMSInteractivityHelper {
    static func getPollBuilderFromDict(_ data: NSDictionary, sdkRoles: [HMSRole]?) -> HMSPollBuilder {
        let pollBuilder = HMSPollBuilder()

        if let title = data["title"] as? String {
            _ = pollBuilder.withTitle(title)
        }

        if let anonymous = data["anonymous"] as? Bool {
            _ = pollBuilder.withAnonymous(anonymous)
        }

        if let duration = data["duration"] as? Int {
            _ = pollBuilder.withDuration(duration)
        }

        if let category = data["category"] as? Int {
            if let pollCategory = HMSPollCategory.init(rawValue: category) {
                _ = pollBuilder.withCategory(pollCategory)
            } else {
                print("unable to create `HMSPollCategory` instance from given `category` value: \(category)")
            }
        }

        if let pollID = data["pollID"] as? String {
            _ = pollBuilder.withPollID(pollID)
        }

        if let rolesStrThatCanViewResponses = data["rolesThatCanViewResponses"] as? [String] {
            let roles = HMSHelper.getRolesFromRoleNames(rolesStrThatCanViewResponses, roles: sdkRoles)
            _ = pollBuilder.withRolesThatCanViewResponses(roles)
        }

        if let rolesStrThatCanVote = data["rolesThatCanVote"] as? [String] {
            let roles = HMSHelper.getRolesFromRoleNames(rolesStrThatCanVote, roles: sdkRoles)
            _ = pollBuilder.withRolesThatCanVote(roles)
        }

        if let userTrackingMode = data["userTrackingMode"] as? Int {
            if let pollUserTrackingMode = HMSPollUserTrackingMode.init(rawValue: userTrackingMode) {
                _ = pollBuilder.withUserTrackingMode(pollUserTrackingMode)
            } else {
                print("unable to create `HMSPollUserTrackingMode` instance from given `userTrackingMode` value: \(userTrackingMode)")
            }
        }

        if let questions = data["questions"] as? [NSDictionary] {
            addQuestionsToPollBuilder(questions: questions, pollBuilder: pollBuilder)
        }

        return pollBuilder
    }

    static func addQuestionsToPollBuilder(questions: [NSDictionary], pollBuilder: HMSPollBuilder) {
        questions.forEach { question in
            guard let questionType = question["rntype"] as? String else {
                return
            }
            switch questionType {
            case "singleChoice":
                if let title = question["title"] as? String,
                    let options = question["options"] as? [String] {
                    _ = pollBuilder.addSingleChoiceQuestion(with: title, options: options)
                } else {
                    print("\(#function) singleChoiceQuestion fields not available!")
                }
            case "multipleChoice":
                if let title = question["title"] as? String,
                    let options = question["options"] as? [String] {
                    _ = pollBuilder.addMultiChoiceQuestion(with: title, options: options)
                } else {
                    print("\(#function) multiChoiceQuestion fields not available!")
                }
            case "shortAnswer":
                if let title = question["title"] as? String {
                    _ = pollBuilder.addShortAnswerQuestion(with: title)
                } else {
                    print("\(#function) shortAnswerQuestion fields not available!")
                }
            case "longAnswer":
                if let title = question["title"] as? String {
                    _ = pollBuilder.addLongAnswerQuestion(with: title)
                } else {
                    print("\(#function) longAnswerQuestion fields not available!")
                }
            case "HMSPollQuestionBuilder":
                let pollQuestionBuilder = self.getPollQuestionBuilderFromDict(question)
                _ = pollBuilder.addQuestion(with: pollQuestionBuilder)
            default:
                print("Unknown Question type")
            }
        }
    }

    static func getPollQuestionBuilderFromDict(_ data: NSDictionary) -> HMSPollQuestionBuilder {
        let pollQuestionBuilder = HMSPollQuestionBuilder()

        if let answerHidden = data["answerHidden"] as? Bool {
            _ = pollQuestionBuilder.withAnswerHidden(answerHidden: answerHidden)
        }

        if let canBeSkipped = data["canBeSkipped"] as? Bool {
            _ = pollQuestionBuilder.withCanBeSkipped(canBeSkipped)
        }

        if let canChangeResponse = data["canChangeResponse"] as? Bool {
            _ = pollQuestionBuilder.withCanChangeResponse(canChangeResponse: canChangeResponse)
        }

        if let duration = data["duration"] as? Int {
            _ = pollQuestionBuilder.withDuration(duration)
        }

        if let index = data["index"] as? Int {
            _ = pollQuestionBuilder.withIndex(index)
        }

        if let maxLength = data["maxLength"] as? Int {
            _ = pollQuestionBuilder.withMaxLength(maxLength: maxLength)
        }

        if let minLength = data["minLength"] as? Int {
            _ = pollQuestionBuilder.withMinLength(minLength: minLength)
        }

        if let title = data["title"] as? String {
            _ = pollQuestionBuilder.withTitle(title)
        }

        if let type = data["type"] as? Int {
            if let questionType = HMSPollQuestionType.init(rawValue: type) {
                _ = pollQuestionBuilder.withType(questionType)
            } else {
                print("unable to create `HMSPollQuestionType` instance from given `type` value: \(type)")
            }
        }

        if let weight = data["weight"] as? Int {
            _ = pollQuestionBuilder.withWeight(weight: weight)
        }

        if let options = data["options"] as? [NSDictionary] {
            addOptionsToPollQuestionBuilder(options: options, pollQuestionBuilder: pollQuestionBuilder)
        }

        return pollQuestionBuilder
    }

    static func addOptionsToPollQuestionBuilder(options: [NSDictionary], pollQuestionBuilder: HMSPollQuestionBuilder) {
        options.forEach { option in
            guard let optionTitle = option["title"] as? String else {
                print("\(#function) option title field not available!")
                return
            }

            if let isCorrect = option["isCorrect"] as? Bool {
                _ = pollQuestionBuilder.addQuizOption(with: optionTitle, isCorrect: isCorrect)
            } else {
                _ = pollQuestionBuilder.addOption(with: optionTitle)
            }
        }
    }
}
