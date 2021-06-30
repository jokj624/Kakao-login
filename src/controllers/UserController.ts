import express, { Request, Response } from "express";
const app = express();
import config from "../config";
const axios = require('axios');
const qs = require('qs');


const redirectURI = async (req: Request, res: Response) => {
    const kakaoAuthURL = `https://kauth.kakao.com/oauth/authorize?client_id=${config.CLIENT_ID}&redirect_uri=${config.REDIRECT_URI}&response_type=code&scope=profile_nickname,profile_image,account_email`;
    res.redirect(kakaoAuthURL);  // 해당 URL로 리다이렉트
};

const getToken = async (req: Request, res: Response) => {
    try {
        const token = await axios({
            method: 'POST',
            url: 'https://kauth.kakao.com/oauth/token',
            headers: { 
                'content-type':'application/x-www-form-urlencoded'
            },
            data: qs.stringify({
                grant_type: 'authorization_code',//특정 스트링
                client_id: config.CLIENT_ID,
                client_secret: config.CLIENT_SECRET,
                redirectUri: config.REDIRECT_URI,
                code: req.query.code,//결과값을 반환했다. 안됐다.
            })//객체를 string 으로 변환
        });
        console.log(token);
        const user = await axios({
            method: 'get',
            url: 'https://kapi.kakao.com/v2/user/me',
            headers: {
                Authorization: `Bearer ${token.data.access_token}`
            }
        });

        console.log(user);
        console.log(user.data); // 유저 DB에서 존재 유무 확인한 다음에 
        // 기존 유저는 jwt 토큰보내주기
        // 없는 유저는 새로 DB에 저장
        res.send('success');
    } catch (err) {
        res.json(err.data);
    }

  
};

export default {
    redirectURI,
    getToken
}