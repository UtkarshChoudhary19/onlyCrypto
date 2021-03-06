import React, {useState} from 'react'
import {Select, Row, Typography, Col, Avatar, Card} from 'antd';
import moment from 'moment';

import { useGetCryptoNewsQuery } from '../Services/cryptoNewsApi';
import { useGetCryptosQuery } from '../Services/cryptoApi';
import Loader from './Loader';

const {Text, Title} =Typography;
const {Option} = Select;

const demoImage = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSOy_4yaUBR6bzrpxysr3B9x6KwzlZ3rPSbCA&usqp=CAU'

const News = ({simplified}) => {
    const [newsCategory, setnewsCategory] = useState('Cryptocurrency')
    const{data: cryptoNews} = useGetCryptoNewsQuery({newsCategory, count: simplified ? 6: 12});
    const {data} =useGetCryptosQuery(100);

    if(!cryptoNews?.value) return <Loader/>;

    return (
        <Row gutter={[24,24]}>
            {!simplified && (
                <Col span={24}>
                    <Select
                    className="select-news"
                    placeholder="Select a Crypto"
                    optionFilterProp="children"
                    onChange={(value) => setnewsCategory(value)}
                    filterOption={(input, option) => option.childern.toLowerCase().indexOf(input.toLowerCase())}>
                        <Option value="Cryptocurrency">
                            Cryptocurrency
                        </Option>
                        {data?.data?.coins.map((coin) =><Option value={coin.name}>{coin.name}</Option>)}
                    </Select>
                </Col>
            )}
            {cryptoNews.value.map((news, i)=>(
                <Col xs={24} sm={12} lg={8} key={i}>
                    <Card hoverable className="news-card">
                        <a href={news.url} target="_blank" rel="noreferrer">
                            <div className="news-image-container">
                                <Title className="news-title" level={4}>{news.name}</Title>
                                <img style={{maxWidth: '200px', maxHeight: '100px'}} src={news?.image?.thumbnail?.contentUrl || demoImage} alt="news"/>
                            </div>
                            <p>
                                {news.description > 100 
                                ? `${news.description.substring(0,100)}...`
                                :news.description
                                }
                            </p>
                            <div className="provider-conatiner">
                                <div>
                                    <Avatar src={news.provider[0]?.image?.thumbnail?.contentUrl || demoImage} alt="news"/>
                                    <Text className="provider-name">{news.provider[0]?.name}</Text>
                                </div>
                                <Text>{moment(news.datePublished).startOf('ss').fromNow()}</Text>
                            </div>
                        </a>
                    </Card>
                </Col>
            ))}
        </Row>
    )
}

export default News
