const InputError = ({ messages = [], className = "" }) => (
    <>
        {Array.isArray(messages) && messages.length > 0 && (
            <>
                {messages.map((message, index) => (
                    <p
                        className={`${className} text-sm text-red-600`}
                        key={index}>
                        {message}
                    </p>
                ))}
            </>
        )}
    </>
)

export default InputError
