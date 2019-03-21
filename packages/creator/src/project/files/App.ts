/**
 * Created by nocoolyoyo on 2019/3/20.
 */
export default `
<script lang="jsx">
import ProjectData from './megh5.json'

export default  {
  render (h) {
    return (
      <div id="#app">
        {h(ProjectData)}
      </div>
    )
  }
}
</script>
`
