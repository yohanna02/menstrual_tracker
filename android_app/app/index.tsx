import { View, Text, ActivityIndicator } from 'react-native'
import React from 'react'
import Colors from '@/constants/Colors'

export default function index() {
  return (
    <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
        <ActivityIndicator size="large" color={Colors.primary} />
    </View>
  )
}