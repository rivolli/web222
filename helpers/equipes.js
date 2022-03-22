const path = require("path")
const fs = require("fs")
const MarkdownIt = require('markdown-it')

module.exports = async function() {
    let folder = path.join(process.cwd(), "views", "teams")

    md = new MarkdownIt()
    let files = await fs.promises.readdir(folder)
    let teams = await Promise.all(files.map(async (file) => {
        const content = await fs.promises.readFile(path.join(folder, file), 'utf8')
        return {content: md.render(content)}
    }));
    
    console.log(teams)
    return teams
}