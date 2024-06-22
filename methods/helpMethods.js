function helpOptions() {
    return {
        text: "How can we assist you today?",
        options:
            [
                { text: 'Ask Refund', callback_data: 'refund' },
                { text: 'Check Order Details', callback_data: 'checkOrder' },
                { text: 'Complaints', callback_data: 'complaints' },
                { text: "Suggestions", callback_data: "suggestions" }
            ]
    };
}


function askRefund()
{
    return {
        text: "Please provide your order number and reason for refund"
    }
}

function checkOrderDetails()
{
    return {
        text: "Please provide your order number"
    }
}   

function complaints()
{
    return {
        text: "Please provide your order number and reason for complaint"
    }
}   

function suggestions()
{
    return {
        text: "Please provide your suggestions"
    }
}   


module.exports = {
    helpOptions,
    askRefund,
    checkOrderDetails,
    complaints,
    suggestions
}