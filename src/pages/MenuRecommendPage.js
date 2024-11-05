import React from 'react';
import './MenuRecommendPage.css';
import MenuRecommendOption from '../components/menu/MenuRecommendOption';
import MenuRecommendTitle from '../components/menu/MenuRecommendTitle';

const MenuRecommendPage = () => {
    return (
        <div>
            <MenuRecommendTitle />
            <MenuRecommendOption />
        </div>
    );
};

export default MenuRecommendPage;