import React from 'react';
import ReactDOM from 'react-dom';
import assert from 'assert';
import App from '../../../src/App';
import Home from '../../../src/components/Home';
import renderer from 'react-test-renderer';
import { mount, render, shallow, configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { wrap } from 'module';
import { MemoryRouter } from 'react-router-dom';
import Fentity from '../../../src/components/Fentity';


configure({ adapter: new Adapter() });

it('Application should render without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<MemoryRouter><App /></MemoryRouter>, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('Wizards page should have a link to the Fentity route for each Wizard page', () => {
    const wrapper = render(
    <MemoryRouter initialEntries={['/directory/wizards']} >
        <App />
    </MemoryRouter>);
    let miniDiv = wrapper.find('.mini').first();
    let linkElement = miniDiv.closest('a');
    let wizardName = miniDiv.find('span').text();
    console.log(linkElement.prop('href')); 
    expect(linkElement.prop('href').toLowerCase()).toEqual('/directory/wizards/' + wizardName.toLowerCase());
    
});

it('/directory/:fentities/:name route should exist and display the Fentity component', () => {
    const wrapper = render(
        <MemoryRouter initialEntries={['/directory/wizards/Merlin']} >
            <App />
        </MemoryRouter>);
    expect(wrapper.find('#creature-container').length).toBe(1);    
});




