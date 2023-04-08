import { View, StyleSheet } from 'react-native'
import { PADDING_SIZES } from '../../consts/field'

interface Props {
    children: React.ReactNode,
    size: number,
    grid: number,
    style: {}
}

export default function Field({ children, size, grid, style }: Props) {
    const PADDING = PADDING_SIZES[grid]
    const FIELD_SIZE = size - PADDING
    const CELL_SIZE = FIELD_SIZE / grid

    function getOuterSize() {
        return {
            width: size,
            height: size,
            padding: PADDING / 2
        }
    }
    function getSize() {
        return {
            width: FIELD_SIZE,
            height: FIELD_SIZE,
            margin: PADDING / 2,
        }
    }

    function drawCellsSlots() {
        const cellSlot = {
            width: CELL_SIZE - PADDING,
            height: CELL_SIZE - PADDING,
            margin: PADDING / 2,
        }

        const cell = (key: number) => <View key={key} style={[styles.cellSlot, cellSlot]} ></View>
        const cellRow = (key: number) => <View key={key} style={[styles.cellGrid]}>
            {(() => {
                const cellRow = []
                for (let j = 0; j < grid; j++) {
                    cellRow.push(cell(j))
                }
                return cellRow
            })()}
        </View>
        const cellGrid = <View >
            {(() => {
                const cellGrid = []
                for (let j = 0; j < grid; j++) {
                    cellGrid.push(cellRow(j))
                }
                return cellGrid
            })()}
        </View>
        return cellGrid
    }

    return (
        <View style={[styles.fieldOuter, getOuterSize(), style]}>
            <View style={[styles.field, getSize()]}>
                {drawCellsSlots()}
                <View style={styles.cells}>
                    {children}
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    fieldOuter: {
        backgroundColor: '#b9aea2',
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    field: {
        // backgroundColor: '#80ff80',
    },
    cellGrid: {
        flexDirection: 'row',
    },
    cellSlot: {
        backgroundColor: '#cfc1b5',
        borderRadius: 5
    },
    cells: {
        position: 'absolute',
        zIndex: 100,
        flex: 1,
        backgroundColor: '#fff',
    }
})