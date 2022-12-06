'use strict'

var gProjects
const gProjectsName = ['Minesweeper', 'In-Picture-Game', 'Touch-Nums', 'Pac-man',
    'Todos', 'Books-Shop']
const gLabels = ['game', 'app', 'game', 'game', 'app', 'app']

const STORAGE_KEY = 'projects'

$(document).ready(init)

function init() {
    renderProjects()
}

function _createProject(index) {
    const dateType = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
    return {
        id: gProjectsName[index],
        ProjName: gProjectsName[index],
        title: 'Please enjoy and leave a feedback!',
        desc: 'An app / game created during my Development studies',
        url: `https://github.com/Yossef-Nahari/${gProjectsName[index]}`,
        publishedAt: new Date().toLocaleDateString("en-US", dateType),
        labels: gLabels[index]
    }
}

function _createProjects() {
    var projects = loadFromStorage(STORAGE_KEY)
    if (!projects || !projects.length) {
        projects = []
        for (var i = 0; i < gProjectsName.length; i++) {
            projects.push(_createProject(i))
        }
    }
    gProjects = projects
    saveToStorage(STORAGE_KEY, gProjects)
}

function getProjects() {
    _createProjects()
    return gProjects
}

function renderProjects() {
    var projects = getProjects()
    var StrHTML = projects.map(project => {
        const { ProjName, title, desc, url, publishedAt, labels } = project
        return `<div class="col-md-4 col-sm-6 portfolio-item">\n
            <a class="portfolio-link" data-toggle="modal" onclick="onOpenModal('${ProjName}', '${title}', '${desc}', '${url}', '${publishedAt}', '${labels}')" href="#portfolioModal">\n
              <div class="portfolio-hover">\n
                <div class="portfolio-hover-content">\n
                  <i class="fa fa-folder-open fa-3x"></i>\n
                </div>\n
              </div>\n
              <img id="img" class="img-fluid" src="img/portfolio/${project.ProjName}.jpg" alt="">\n
            </a>\n
            <div class="portfolio-caption">\n
              <h4>Threads</h4>\n
              <p class="bg-dark bg-gradient text-white">${project.ProjName}</p>\n
            </div>\n
            </div >\n`
    })
    // document.querySelector('#post').innerHTML = StrHTML.join('')
    $('#post').html(StrHTML.join(''))
}

function onOpenModal(ProjName, title, desc, url, publishedAt, labels) {
    $('.modal-name').text(ProjName)
    $('.item-intro').text(title)
    $('.img-modal').attr("src", `img/portfolio/${ProjName}.jpg`)
    $('.p-modal').text(desc)
    // $('.url').text(`https://yossef-nahari.github.io/${ProjName}/`)
    $('.btnModal').attr("src", `https://yossef-nahari.github.io/${ProjName}/`)
    $('.date-modal').text(publishedAt)
    $('.labels').text('Labels: ' + labels)
}

function onSendEmail() {
    // var email = document.querySelector('.emailAddress').value
    var email = $('.email').val()
    var name = $('.emailName').val()
    var subject = $('.subject').val()
    var msg = $('.eMsg').val()
    window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=yossi.nahari@gmail.com&su=${subject}&b
    ody=${msg}`, '_blank')
}