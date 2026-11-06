param(
    [Parameter(ValueFromRemainingArguments = $true)]
    [string[]]$Args
)
node "$PSScriptRoot\llm.js" @Args
