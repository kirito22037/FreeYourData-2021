import React from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import { BarChart } from "react-native-chart-kit";

export default function BarGraph( {data, width, barColor,labelColor, title} ) {
    const chartConfig = {
        backgroundGradientFrom: "#e3e2e1",
        backgroundGradientTo: "#e3e2e1",
        height:5000,
        fillShadowGradient: barColor, //`rgba(1, 122, 205, 1)`,
        fillShadowGradientOpacity: 1,
        color: (opacity = 1) => `rgba(1, 122, 205, 1)`, //`rgba(1, 122, 205, ${opacity})`,
        strokeWidth: 3, // optional, default 3
        barPercentage: 0.5,
        // fillShadowGradient: 'green'
        };

    return (
        <View style={ {...styles.mt15, ...styles.card} } >
                <Text style={ {...styles.heading, padding: 20 } }> { title }</Text>
                <BarChart 
                    style={ {borderRadius: 10} }
                    data={data}
                    width={width}
                    height={220}
                    yAxisLabel="$"
                    chartConfig={chartConfig}
                    verticalLabelRotation={0}
                    />
            </View>
    );
}

const styles = StyleSheet.create({
    mt15: {
        marginTop: 15
    },
    card: {
        width: Dimensions.get("window").width-30,
        borderStyle: 'dotted',
        borderColor: 'black',
        borderRadius: 10,
        backgroundColor: "#e3e2e1"
    },
    heading: {
        fontWeight: 'bold',
        fontSize: 18
    },
});