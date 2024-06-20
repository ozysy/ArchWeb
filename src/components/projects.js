// Projects.js

import React from 'react';
import '../styles/projects.css';

const Projects = ({ filter }) => {
    const projects = [
        { type: 'architecture', src: '../img/villa.png', alt: 'Вилла вест-нортон', title: 'Вилла вест-нортон' },
        { type: 'commercial', src: '../img/office1.png', alt: 'Офисс Джей-Джей Филмс', title: 'Офисс Джей-Джей Филмс' },
        { type: 'commercial', src: '../img/mall.png', alt: 'ТРК Сальфеджио', title: 'ТРК Сальфеджио' },
        { type: 'architecture', src: '../img/office2.png', alt: 'Офисс Монео', title: 'Офисс Монео' },
        { type: 'private', src: '../img/interior1.png', alt: 'Интерьер Осмос', title: 'Интерьер Осмос' },
        { type: 'private', src: '../img/interior2.png', alt: 'Интерьер Галий', title: 'Интерьер Галий' },
    ];

    const filteredProjects = filter === 'all' ? projects : projects.filter(project => project.type === filter);

    return (
        <div className="projects">
            {filteredProjects.map((project, index) => (
                <div className={`project ${project.type}`} key={index}>
                    <img src={project.src} alt={project.alt} />
                    <p className="font-weight-bold">{project.title}</p>
                </div>
            ))}
        </div>
    );
};

export default Projects;

