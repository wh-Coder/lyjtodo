import '../assets/styles/footer.styl'

export default {
    data() {
        return {
            author: 'lyj'
        }
    },
    render() {
        return (
            <div class="footer">
                <span>Written by { this.author }</span>
            </div>
        )
    }
}