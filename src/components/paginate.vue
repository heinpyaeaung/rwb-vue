<template>
    <div class="pagination-container">
        <ul>
            <li>
                <button @click="onClickFirstPage" :disabled="isInFirstPage">First</button>
            </li>
            <!-- <li>
                <button  @click="onClickPreviousPage" :disabled="isInFirstPage">Previous</button>
            </li> -->
            <li v-for="page in pages" :key="page">
                <button @click="onClickPage(page.name)" :disabled="page.isDisabled" :class="{disabled:page.isDisabled}">{{page.name}}</button>
            </li>
            <!-- <li>
                 <button  @click="onClickNextPage" :disabled="isInLastPage">Next</button>
            </li> -->
            <li>
                 <button  @click="onClickLastPage" :disabled="isInLastPage">Last</button>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        props: {
            maxVisibleButton: {
                type: Number,
                required: true,
                default: 3
            },
            totalPages: {
                type: Number,
                required: true,
            },
            perPage: {
                type: Number,
                required: true,
            },
            currentPage: {
                type: Number,
                required: true,
            }
        },
        computed: {
            startPage(){
                //when on the first page
                if(this.currentPage === 1){
                    return 1
                }
                //when on the last page
                if(this.currentPage === this.totalPages){
                    const start = this.totalPages - (this.maxVisibleButton - 1)
                    if(start === 0){
                        return 1
                    }else{
                        return start
                    }
                }
                //in between
                return this.currentPage - 1;
            },
            pages(){
                const range = [];
                for(
                    let i = this.startPage; 
                    i <= Math.min(this.startPage + this.maxVisibleButton - 1, this.totalPages);
                    i++
                ){
                    range.push({
                        name: i,
                        isDisabled: i === this.currentPage
                    });
                }

                return range;
            },
            isInFirstPage() {
                return this.currentPage === 1;
            },
            isInLastPage() {
                return this.currentPage === this.totalPages;
            }
        },
        methods: {
            onClickFirstPage() {
                return this.$emit('pagechanged', 1)
            },
            onClickPreviousPage() {
                return this.$emit('pagechanged', this.currentPage - 1)
            },
            onClickPage(page) {
                this.$emit('pagechanged', page)
            },
            onClickNextPage() {
                return this.$emit('pagechanged', this.currentPage + 1)
            },
            onClickLastPage() {
                return this.$emit('pagechanged', this.totalPages)
            },

        },
    }
</script>

<style lang="scss" scoped>
    .pagination-container{
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .disabled{
        color: grey;
    }
    ul{
        li{
            display: inline-block;
            button{
                padding: 10px 25px;
                background-color: #fff;
                color: #000;
                cursor: pointer;
            } 
        }
    }
</style>