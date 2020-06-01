<template>
    <div class="noticeList-container">
        <div class="main inghong-container">
            <div class="container clearfix">
                <div class="padding-top-sm">
                    <div class="tabs flex flex-row align-center text-darkGray text-xl">
                        <div :class="activeName=='全部'?'pointer text-orangeDark text-xlx text-bold active ':'pointer'" @click="tabsClick('全部')">全部</div>
                        <div :class="activeName=='新闻'?'pointer text-orangeDark text-xlx text-bold active ':'pointer'" @click="tabsClick('新闻')">新闻资讯</div>
                        <div :class="activeName=='精读'?'pointer text-orangeDark text-xlx text-bold active ':'pointer'" @click="tabsClick('精读')">精读</div>
                        <div :class="activeName=='活动'?'pointer text-orangeDark text-xlx text-bold active ':'pointer'" @click="tabsClick('活动')">活动</div>
                        <div :class="activeName=='公告'?'pointer text-orangeDark text-xlx text-bold active ':'pointer'" @click="tabsClick('公告')">公告</div>
                    </div>
                    <div class="centent-box">
                        <div class="flex flex-direction" v-if="noticeList.length!=0">
                            <!-- 全部 -->
                            <div class="flex flex-direction" v-if="activeName=='全部'">
                                <div class="flex flex-direction" v-if="all.dataList">
                                    <div class="flex flex-direction" v-if="all.dataList.length!=0">
                                        <div class="notice-item bg-white">
                                            <img class="notice-img" src="../../assets/images/aqbz_banner_image.png" alt="">
                                            <div class="notice-msg">
                                                <div class="notice-title text-cut_line_2 text-blackDark text-xlx text-bold ">习近平：将疫情政治化、标签化，不利于国际合作不利于国际合作不利于国习近平：将疫情政治化、标签化，不利于国际合作不利于国际合作不利于国</div>
                                                <div class="notice-title-s text-cut_line_2 text-darkGray text-df">习近平：将疫情政治化、标签化，不利于国际合作习近平：将疫情政治化、标签化，不利于国际合作国际合习近平：将疫情政治化、标签化，不利于国际合作习近平：将疫情政治化、标签化，不利于国际合作国际合</div>
                                                <div class="flex flex-row align-center justify-between">
                                                    <div class="flex flex-row align-center">
                                                        <span class="badge bg-orangeDark text-white text-center">·新闻·</span>
                                                        <div class="time text-sm text-gray">2020/04/09 14:40:04</div>
                                                    </div>
                                                    <div class="source text-sm text-gray"><span>来源：来源来源来源</span></div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="text-center" style="margin-top: 68px;">
                                            <el-pagination
                                            @size-change="handleSizeChange"
                                            @current-change="handleCurrentChange"
                                            :current-page="currentPage"
                                            :page-sizes="[10, 20, 50, 100]"
                                            :page-size="pageSize"
                                            layout="total, sizes, prev, pager, next, jumper"
                                            :total="total">
                                            </el-pagination>
                                        </div>
                                    </div>
                                    <div class="text-center" v-else>
                                        <img src="../../assets/images/noMsg.png" alt="" class="noMsg">
                                        <div class="nomsg-tip text-gray text-lg">无任何记录～</div>
                                    </div>
                                </div>
                            </div>
                            <!-- 新闻 -->
                            <div class="flex flex-direction" v-if="activeName=='新闻'">
                                <div class="flex flex-direction" v-if="news.dataList">
                                    <div class="flex flex-direction" v-if="news.dataList.length!=0">
                                        <div class="flex flex-row flex-wrap">
                                            <div class="notice-item bg-white pointer" v-for="(item, index) in news.dataList" :key="index" @click="toNoticeDetail(item.id,'true','新闻')">
                                                <img class="notice-img" :src="item.image" alt="">
                                                <div class="notice-msg">
                                                    <div class="notice-title text-cut_line_2 text-blackDark text-xlx text-bold ">{{item.title}}</div>
                                                    <div class="notice-title-s text-cut_line_2 text-darkGray text-df">{{item.subTitle}}</div>
                                                    <div class="flex flex-row align-center justify-between">
                                                        <div class="flex flex-row align-center">
                                                            <span class="badge bg-orangeDark text-white text-center">·新闻·</span>
                                                            <div class="time text-sm text-gray">{{item.addTimeString}}</div>
                                                        </div>
                                                        <div class="source text-sm text-gray"><span>来源：{{item.source}}</span></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="text-center" style="margin-top: 68px;">
                                            <el-pagination
                                            @size-change="handleSizeChange"
                                            @current-change="handleCurrentChange"
                                            :current-page="currentPage"
                                            :page-sizes="[10, 20, 50, 100]"
                                            :page-size="pageSize"
                                            layout="total, sizes, prev, pager, next, jumper"
                                            :total="total">
                                            </el-pagination>
                                        </div>
                                    </div>
                                    <div class="text-center" v-else>
                                        <img src="../../assets/images/noMsg.png" alt="" class="noMsg">
                                        <div class="nomsg-tip text-gray text-lg">无任何记录～</div>
                                    </div>
                                </div>
                            </div>
                            <!-- 精读 -->
                            <div class="flex flex-direction" v-if="activeName=='精读'">
                                <div class="flex flex-direction" v-if="perusal_24k.dataList">
                                    <div class="flex flex-direction" v-if="perusal_24k.dataList.length!=0">
                                        <div class="flex flex-row flex-wrap">
                                            <div class="notice-item bg-white pointer" v-for="(item, index) in perusal_24k.dataList" :key="index" @click="toNoticeDetail(item.id,'true','精读')">
                                                <img class="notice-img" :src="item.image" alt="">
                                                <div class="notice-msg">
                                                    <div class="notice-title text-cut_line_2 text-blackDark text-xlx text-bold ">{{item.title}}</div>
                                                    <div class="notice-title-s text-cut_line_2 text-darkGray text-df">{{item.subTitle}}</div>
                                                    <div class="flex flex-row align-center justify-between">
                                                        <div class="flex flex-row align-center">
                                                            <span class="badge bg-orangeDark text-white text-center">·精读·</span>
                                                            <div class="time text-sm text-gray">{{item.addTimeString}}</div>
                                                        </div>
                                                        <div class="source text-sm text-gray">来源：{{item.source}}</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="text-center" style="margin-top: 68px;">
                                            <el-pagination
                                            @size-change="handleSizeChange"
                                            @current-change="handleCurrentChange"
                                            :current-page="currentPage"
                                            :page-sizes="[10, 20, 50, 100]"
                                            :page-size="pageSize"
                                            layout="total, sizes, prev, pager, next, jumper"
                                            :total="total">
                                            </el-pagination>
                                        </div>
                                    </div>
                                    <div class="text-center" v-else>
                                        <img src="../../assets/images/noMsg.png" alt="" class="noMsg">
                                        <div class="nomsg-tip text-gray text-lg">无任何记录～</div>
                                    </div>
                                </div>
                            </div>
                            <!-- 活动 -->
                            <div class="flex flex-direction" v-if="activeName=='活动'">
                                <div class="flex flex-direction" v-if="hot_activity.dataList">
                                    <div class="flex flex-direction" v-if="hot_activity.dataList.length!=0">
                                        <div class="flex flex-row flex-wrap">
                                            <div class="notice-item bg-white pointer" v-for="(item, index) in hot_activity.dataList" :key="index" @click="toNoticeDetail(item.id,'true','活动')">
                                                <img class="notice-img" :src="item.image" alt="">
                                                <div class="notice-msg">
                                                    <div class="notice-title text-cut_line_2 text-blackDark text-xlx text-bold ">{{item.title}}</div>
                                                    <div class="notice-title-s text-cut_line_2 text-darkGray text-df">{{item.subTitle}}</div>
                                                    <div class="flex flex-row align-center justify-between">
                                                        <div class="flex flex-row align-center">
                                                            <span class="badge bg-orangeDark text-white text-center">·活动·</span>
                                                            <div class="time text-sm text-gray">{{item.addTimeString}}</div>
                                                        </div>
                                                        <div class="source text-sm text-gray"><span>来源：{{item.source}}</span></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="text-center" style="margin-top: 68px;">
                                            <el-pagination
                                            @size-change="handleSizeChange"
                                            @current-change="handleCurrentChange"
                                            :current-page="currentPage"
                                            :page-sizes="[10, 20, 50, 100]"
                                            :page-size="pageSize"
                                            layout="total, sizes, prev, pager, next, jumper"
                                            :total="total">
                                            </el-pagination>
                                        </div>
                                    </div>
                                    <div class="text-center" v-else>
                                        <img src="../../assets/images/noMsg.png" alt="" class="noMsg">
                                        <div class="nomsg-tip text-gray text-lg">无任何记录～</div>
                                    </div>
                                </div>
                            </div>
                            <!-- 公告 -->
                            <div class="flex flex-direction" v-if="activeName=='公告'">
                                <div class="flex flex-direction" v-if="noticeList">
                                    <div class="flex flex-direction" v-if="noticeList.length!=0">
                                        <div class="flex flex-row flex-wrap">
                                            <div class="notice-item bg-white pointer" v-for="(item, index) in noticeList" :key="index" @click="toNoticeDetail(item.id,'false','公告')">
                                                <img class="notice-img" src="../../assets/images/gg.png" alt="">
                                                <div class="notice-msg">
                                                    <div class="notice-title text-cut_line_2 text-blackDark text-xlx text-bold ">{{item.title}}</div>
                                                    <div class="notice-title-s text-cut_line_2 text-darkGray text-df">{{item.remark}}</div>
                                                    <div class="flex flex-row align-center justify-between">
                                                        <div class="flex flex-row align-center">
                                                            <span class="badge bg-orangeDark text-white text-center">·公告·</span>
                                                            <div class="time text-sm text-gray">{{item.addTimeString}}</div>
                                                        </div>
                                                        <div class="source text-sm text-gray"><span v-if="item.author!=''&&item.author!=null">来源：{{item.author}}</span></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="text-center" style="margin-top: 68px;">
                                            <el-pagination
                                            @size-change="handleSizeChange"
                                            @current-change="handleCurrentChange"
                                            :current-page="currentPage"
                                            :page-sizes="[10, 20, 50, 100]"
                                            :page-size="pageSize"
                                            layout="total, sizes, prev, pager, next, jumper"
                                            :total="total">
                                            </el-pagination>
                                        </div>
                                    </div>
                                    <div class="text-center" v-else>
                                        <img src="../../assets/images/noMsg.png" alt="" class="noMsg">
                                        <div class="nomsg-tip text-gray text-lg">无任何记录～</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { getCookie, setCookie, removeCookie } from '@/utils/auth'
    export default {
        name: 'noticeList',
        components: {},
        inject: ["eventHub"],
        data() {
            return {
                activeName: '全部',
                all: {
                    dataList: []
                },
                noticeList: {},
                hot_activity: {},
                news: {},
                perusal_24k: {},
                currentPage: 1,
                pageSize: 10,
                total: 0
            }
        },
        watch: {
        },
        created() {
        },
        mounted() {
            if(this.$route.query.name) {
                this.activeName = this.$route.query.name;
            }
            this.getNoticeList();
            this.getHot_activity(this.currentPage,this.pageSize)
            this.getNew(this.currentPage,this.pageSize)
            this.getPerusal_24k(this.currentPage,this.pageSize)
        },
        destroyed() {

        },
        methods: {
            // 切换
            tabsClick(name) {
                this.activeName = name;
                this.currentPage = 1;
                this.pageSize = 10;
                if(this.activeName=='新闻') {
                    this.getNew(this.currentPage,this.pageSize)
                } else if(this.activeName=='精读') {
                    this.getPerusal_24k(this.currentPage,this.pageSize)
                } else if(this.activeName=='活动') {
                    this.getHot_activity(this.currentPage,this.pageSize)
                } else if(this.activeName=='公告') {
                    this.getNoticeList();
                }
            },
            // 获取活动列表
            async getHot_activity(pageNum,pageSize) {
                let data = {
                    pageNum: pageNum,
                    pageSize: pageSize,
                    articleClassId: 'hot_activity',
                    articleClassCode: 'hot_activity',
                };
                this.hot_activity = await this.$api.getFindList(data,getCookie('accessToken'));
                if(this.activeName=='活动') {
                    this.total=this.hot_activity.page.total;
                }
            },
            // 获取新闻列表
            async getNew(pageNum,pageSize) {
                let data = {
                    pageNum: pageNum,
                    pageSize: pageSize,
                    articleClassId: 'new',
                    articleClassCode: 'new',
                };
                this.news = await this.$api.getFindList(data,getCookie('accessToken'));
                if(this.activeName=='新闻') {
                    this.total=this.news.page.total;
                }
            },
            // 获取精读列表
            async getPerusal_24k(pageNum,pageSize) {
                let data = {
                    pageNum: pageNum,
                    pageSize: pageSize,
                    articleClassId: 'perusal_24k',
                    articleClassCode: 'perusal_24k',
                };
                this.perusal_24k = await this.$api.getFindList(data,getCookie('accessToken'));
                if(this.activeName=='精读') {
                    this.total=this.perusal_24k.page.total;
                }
            },
            // 获取公告列表
            async getNoticeList() {
                this.noticeList = await this.$api.getNoticeList('',getCookie('accessToken'));
                if(this.activeName=='公告') {
                    this.total=this.noticeList.length;
                }
                this.eventHub.$emit("notice");
            },
            // 每页多少条操作
            handleSizeChange(val) {
                this.pageSize = val;
                if(this.activeName=='新闻') {
                    this.getNew(this.currentPage,this.pageSize)
                } else if(this.activeName=='精读') {
                    this.getPerusal_24k(this.currentPage,this.pageSize)
                } else if(this.activeName=='活动') {
                    this.getHot_activity(this.currentPage,this.pageSize)
                } else if(this.activeName=='公告') {
                    this.getNoticeList();
                }
            },
            // 分页操作
            handleCurrentChange(val) {
                this.currentPage = val;
                if(this.activeName=='新闻') {
                    this.getNew(this.currentPage,this.pageSize)
                } else if(this.activeName=='精读') {
                    this.getPerusal_24k(this.currentPage,this.pageSize)
                } else if(this.activeName=='活动') {
                    this.getHot_activity(this.currentPage,this.pageSize)
                } else if(this.activeName=='公告') {
                    this.getNoticeList();
                }
            },
            // 跳转到详情
            toNoticeDetail(id,isArticle,name) {
                this.$router.push({path: '/noticeDetail', query: {id: id,isArticle:isArticle,name:name}})
            },
        }
    }

</script>
<style lang="scss" scoped>
    .noticeList-container {
        overflow: hidden;
        background-color: #F7F7F7;
        .main {
            margin-bottom: 40px;
            margin-top: 20px;
            .container {
                margin: 0 auto;
                width: 1200px;
                min-height: 500px;
                .tabs {
                    height: 37px;
                    div {
                        margin-right: 90px;
                        position: relative;
                        padding-bottom: 13px;
                        transition: all 0.3s;
                        &:hover {
                            color: var(--orangeDark);
                        }
                        &.active {
                            &:after {
                                content: "";
                                position: absolute;
                                left: 50%;
                                right: 0;
                                height: 0;
                                bottom: 0;
                                width: 34px;
                                transform: translateX(-50%);
                                border-bottom: 4px solid var(--orangeDark);
                                border-radius: 2px;
                            }
                        }
                    }
                }
                .centent-box {
                    .notice-item {
                        width: 380px;
                        height: 495px;
                        margin-right: 30px;
                        margin-top: 30px;
                        transition: all 0.3s;
                        &:hover {
                            box-shadow: 0px 1px 11px 3px rgba(0,0,0,0.08);
                        }
                        &:nth-child(3n) {
                            margin-right: 0;
                        }
                        .notice-img {
                            width: 100%;
                            height: 260px;
                        }
                        .notice-msg {
                            padding: 0 20px;
                            .notice-title {
                                height:56px;
                                line-height:28px;
                                margin: 24px 0 14px 0;
                            }
                            .notice-title-s {
                                margin-bottom: 52px;
                                height:40px;
                                line-height:20px;
                            }
                            .badge {
                                display: inline-block;
                                width: 57px;
                                padding: 4px 0;
                                font-size: 15px;
                                border-radius: 16px;
                                margin-right: 14px;
                            }
                        }
                    }
                    .noMsg {
                        width: 792px;
                        height: 264px;
                        margin: 170px auto 0;
                    }
                    .nomsg-tip {
                        margin-top: 43px;
                        margin-bottom: 110px;
                    }
                }
            }
        }
    }

</style>
