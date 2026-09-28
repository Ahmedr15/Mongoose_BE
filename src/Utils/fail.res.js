export const fail_res = ({ msg = "Error", statuscode = 500 }) => {
    throw new Error(msg, {
        cause: {
            statuscode
        }
    }
    )
}